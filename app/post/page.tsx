import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import PostFormServer from "@/components/PostFormServer";

// 許可する画像MIMEタイプ
const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"];
// 最大ファイルサイズ: 5MB
const MAX_FILE_SIZE = 5 * 1024 * 1024;
// 投稿間隔: 60秒
const POST_INTERVAL_SECONDS = 60;

export default async function PostPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  async function createPost(formData: FormData) {
    "use server";
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect("/login");

    const content = (formData.get("content") as string ?? "").trim();
    const category = formData.get("category") as string;
    const imageFile = formData.get("image") as File | null;

    // ── コンテンツバリデーション ──
    if (!content || content.length > 280) {
      throw new Error("投稿内容が無効です（1〜280文字）");
    }

    const validCategories = ["風景", "グルメ", "祭り", "つぶやき"];
    if (!validCategories.includes(category)) {
      throw new Error("カテゴリが無効です");
    }

    // ── レート制限: 60秒に1投稿 ──
    const { data: recentPost } = await supabase
      .from("posts")
      .select("created_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (recentPost) {
      const secondsAgo = (Date.now() - new Date(recentPost.created_at).getTime()) / 1000;
      if (secondsAgo < POST_INTERVAL_SECONDS) {
        throw new Error(`投稿は${POST_INTERVAL_SECONDS}秒に1回までです`);
      }
    }

    // ── 画像バリデーション ──
    let image_url: string | null = null;

    if (imageFile && imageFile.size > 0) {
      // ファイルサイズチェック
      if (imageFile.size > MAX_FILE_SIZE) {
        throw new Error("画像ファイルは5MB以下にしてください");
      }

      // MIMEタイプチェック（サーバー側）
      if (!ALLOWED_MIME_TYPES.includes(imageFile.type)) {
        throw new Error("JPEG・PNG・GIF・WebP形式の画像のみアップロードできます");
      }

      // ファイルの先頭バイトでマジックナンバーを確認（より厳格な検証）
      const buffer = await imageFile.arrayBuffer();
      const bytes = new Uint8Array(buffer.slice(0, 4));
      const isValidImage =
        (bytes[0] === 0xff && bytes[1] === 0xd8) || // JPEG
        (bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47) || // PNG
        (bytes[0] === 0x47 && bytes[1] === 0x49 && bytes[2] === 0x46) || // GIF
        (bytes[0] === 0x52 && bytes[1] === 0x49 && bytes[2] === 0x46 && bytes[3] === 0x46); // WebP (RIFF)

      if (!isValidImage) {
        throw new Error("無効な画像ファイルです");
      }

      // 安全なファイルパスを生成（拡張子はMIMEタイプから決定）
      const mimeToExt: Record<string, string> = {
        "image/jpeg": "jpg",
        "image/png": "png",
        "image/gif": "gif",
        "image/webp": "webp",
      };
      const safeExt = mimeToExt[imageFile.type];
      const safePath = `${user.id}/${Date.now()}.${safeExt}`;

      const { error: uploadError } = await supabase.storage
        .from("post-images")
        .upload(safePath, imageFile, { contentType: imageFile.type });

      if (!uploadError) {
        const { data } = supabase.storage.from("post-images").getPublicUrl(safePath);
        image_url = data.publicUrl;
      }
    }

    await supabase.from("posts").insert({
      user_id: user.id,
      content,
      category,
      image_url,
    });

    revalidatePath("/");
    redirect("/");
  }

  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "var(--muted)", textDecoration: "none", fontSize: 14, marginBottom: 20, fontWeight: 600 }}>
        <ArrowLeft size={16} />
        タイムラインに戻る
      </Link>

      <div style={{ background: "var(--surface)", borderRadius: 20, border: "1px solid var(--border)", padding: "28px", boxShadow: "0 4px 16px rgba(45,106,79,0.08)" }}>
        <div style={{ marginBottom: 24 }}>
          <h1 style={{ fontSize: 22, fontWeight: 900, color: "var(--primary)" }}>✏️ 新しい投稿</h1>
          <p style={{ color: "var(--muted)", fontSize: 14, marginTop: 4 }}>
            青森の魅力・日常・グルメ・祭りなど、なんでもシェアしよう！
          </p>
        </div>

        {user ? (
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20, padding: "12px", background: "var(--surface-2)", borderRadius: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: "50%", background: "var(--border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>😊</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14 }}>{user.email}</div>
              <div style={{ fontSize: 12, color: "var(--muted)" }}>ログイン中</div>
            </div>
          </div>
        ) : (
          <div style={{ marginBottom: 20, padding: "14px", background: "#fef3c7", borderRadius: 12, fontSize: 14, color: "#92400e" }}>
            ⚠️ 投稿するには{" "}
            <Link href="/login" style={{ color: "var(--primary)", fontWeight: 700 }}>ログイン</Link>
            {" "}が必要です
          </div>
        )}

        <PostFormServer action={createPost} disabled={!user} />
      </div>
    </div>
  );
}
