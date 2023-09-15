import React from "react";
import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";
import { IPost } from "@/models/Post";

async function getData() {
  try {
    const res = await fetch('http://localhost:3000/api/posts',
      { next: { revalidate: 10 } });

    return res.json();
  } catch (error) {
    throw new Error('Failed to fetch data');
  }
}


const Blog = async () => {
  const data = await getData();

  return (
    <div className={styles.mainContainer}>
      {
        data.map((post: IPost) => (
          <Link href={`/blog/${post._id}`} className={styles.container} key={post._id.toString()}>
            <div className={styles.imageContainer}>
              <Image
                src={post.image}
                alt=""
                width={400}
                height={250}
                className={styles.image}
              />
            </div>
            <div className={styles.content}>
              <h1 className={styles.title}>{post.title}</h1>
              <p className={styles.desc}>{post.desc}</p>
            </div>
          </Link>
        ))
      }
    </div>
  );
};

export default Blog;