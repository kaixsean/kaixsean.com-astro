import avatarImage from "../assets/authors/avatar.png";
import type { ImageMetadata } from "astro";

export interface Props {
  name: string;
  slug: string;
  image: string | ImageMetadata;
  bio: string;
}

export type Author = Props;

export const authors: Props[] = [
  {
    name: "Kaix",
    slug: "kaixsean",
    image: avatarImage,
    bio: "Kaix 是一位軟體工程師，喜歡旅遊、攝影與閱讀，也持續在個人部落格記錄生活與學習。",
  },
];
