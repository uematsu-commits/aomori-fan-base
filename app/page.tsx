import { createClient } from "@/lib/supabase/server";
import { Post } from "@/lib/types";
import TimelineClient from "@/components/TimelineClient";

export const revalidate = 0;

export default async function Home() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  const { data: posts } = await supabase
    .from("posts")
    .select(`
      *,
      profiles(*),
      comments(*, profiles(*)),
      likes(count)
    `)
    .order("created_at", { ascending: false })
    .returns<Post[]>();

  // ログイン中ユーザーのいいね一覧
  const { data: myLikes } = user
    ? await supabase.from("likes").select("post_id").eq("user_id", user.id)
    : { data: [] };

  const likedPostIds = new Set((myLikes ?? []).map((l) => l.post_id));

  return (
    <TimelineClient
      posts={posts ?? []}
      user={user}
      likedPostIds={[...likedPostIds]}
    />
  );
}
