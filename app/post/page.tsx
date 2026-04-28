import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import PostFormServer from "@/components/PostFormServer";

export default async function PostPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  async function createPost(formData: FormData) {
    "use server";
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect("/login");

    const content = formData.get("content") as string;
    const category = formData.get("category") as string;
    const imageFile = formData.get("image") as File | null;

    let image_url: string | null = null;

    if (imageFile && imageFile.size > 0) {
      const ext = imageFile.name.split(".").pop();
      const path = `${user.id}/${Date.now()}.${ext}`;
      const { error: uploadError } = await supabase.storage
        .from("post-images")
        .upload(path, imageFile);

      if (!uploadError) {
        const { data } = supabase.storage.from("post-images").getPublicUrl(path);
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
