export type Category = "風景" | "グルメ" | "祭り" | "つぶやき";

export type User = {
  id: string;
  name: string;
  avatar: string;
  location: "県内" | "県外" | "その他";
};

export type Post = {
  id: string;
  user: User;
  content: string;
  imageUrl?: string;
  category: Category;
  createdAt: string;
  likes: number;
  comments: Comment[];
};

export type Comment = {
  id: string;
  user: User;
  content: string;
  createdAt: string;
};

export const mockUsers: User[] = [
  { id: "1", name: "津軽りんご太郎", avatar: "🍎", location: "県内" },
  { id: "2", name: "東京のねぶた好き", avatar: "🏮", location: "県外" },
  { id: "3", name: "八戸出身さば子", avatar: "🐟", location: "県外" },
  { id: "4", name: "弘前城の桜守", avatar: "🌸", location: "県内" },
  { id: "5", name: "田舎館田んぼアート", avatar: "🌾", location: "県内" },
];

export const mockPosts: Post[] = [
  {
    id: "1",
    user: mockUsers[0],
    content: "今朝の岩木山、雲一つなくて最高でした！やっぱり岩木山は青森の宝だべな〜。りんごの花もそろそろ咲き始めてきたよ🍎",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    category: "風景",
    createdAt: "2026-04-27T08:30:00",
    likes: 24,
    comments: [
      {
        id: "c1",
        user: mockUsers[1],
        content: "んだんだ！岩木山きれいだね。東京にいるとこういう景色が恋しくなる〜",
        createdAt: "2026-04-27T09:00:00",
      },
    ],
  },
  {
    id: "2",
    user: mockUsers[1],
    content: "先週帰省したとき食べたじゃっぱ汁が忘れられない…東京では絶対食べられない味。誰かレシピ知ってる人いる？源たれ使って自分で作れないか試したいんだけど",
    category: "グルメ",
    createdAt: "2026-04-27T10:15:00",
    likes: 18,
    comments: [
      {
        id: "c2",
        user: mockUsers[2],
        content: "じゃっぱ汁は鱈のアラと大根と豆腐があれば基本OK！味噌は赤味噌で源たれ少し入れると本場の味になるよ〜",
        createdAt: "2026-04-27T11:00:00",
      },
    ],
  },
  {
    id: "3",
    user: mockUsers[2],
    content: "八戸のえんぶりが終わっちゃったけど、今年も動画で見てたら泣いてしまった…。生で見たいなあ。来年こそは帰省して見に行く！",
    imageUrl: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80",
    category: "祭り",
    createdAt: "2026-04-26T20:00:00",
    likes: 31,
    comments: [],
  },
  {
    id: "4",
    user: mockUsers[3],
    content: "弘前公園の桜、今年も綺麗に咲いてます！外濠のソメイヨシノが満開で、お堀に花びらが浮かんでる様子が幻想的だよ✨ 来週末まで見頃かな",
    imageUrl: "https://images.unsplash.com/photo-1522383225653-ed111181a951?w=800&q=80",
    category: "風景",
    createdAt: "2026-04-26T14:30:00",
    likes: 52,
    comments: [
      {
        id: "c3",
        user: mockUsers[1],
        content: "わあ〜！毎年見に行きたいと思いながら行けてない。来年こそ！",
        createdAt: "2026-04-26T15:00:00",
      },
    ],
  },
  {
    id: "5",
    user: mockUsers[4],
    content: "「わ」「じゃ」「だ」って言葉の意味、津軽と南部で微妙に違うよね〜😂 津軽では「わ」は私の意味で使うけど、南部の人に言ったら通じなかった笑",
    category: "つぶやき",
    createdAt: "2026-04-25T19:00:00",
    likes: 44,
    comments: [
      {
        id: "c4",
        user: mockUsers[0],
        content: "わかる！下北弁はまた違うしね。青森でも全然違う方言があるのが面白いよね",
        createdAt: "2026-04-25T19:30:00",
      },
      {
        id: "c5",
        user: mockUsers[2],
        content: "南部では「わ」は感嘆の「わあ」みたいな感じで使うよね笑",
        createdAt: "2026-04-25T20:00:00",
      },
    ],
  },
  {
    id: "6",
    user: mockUsers[0],
    content: "豊盃の新酒が出た！地元の酒屋で見つけたから即買い。フルーティーで飲みやすい。田酒と飲み比べするのが最高の幸せ🍶",
    category: "グルメ",
    createdAt: "2026-04-25T12:00:00",
    likes: 29,
    comments: [],
  },
];
