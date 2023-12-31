import React from "react";
import styles from "./page.module.css";
import Image from "next/image";
import { notFound } from "next/navigation";
import { IPost } from "@/models/Post";

async function getData(id: number) {
  const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return notFound()
  }

  return res.json();
}


export async function generateMetadata({ params }: { params: any }) {

  const post = await getData(params.id) as IPost;
  return {
    title: post.title,
    description: post.desc
  }
}

const BlogPost = async ({ params }: { params: any }) => {
  const post = await getData(params.id) as IPost;

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.info}>
          <h1 className={styles.title}>{post.title}</h1>
          <p className={styles.desc}>
            {post.desc}
          </p>
          <div className={styles.author}>
            <Image
              src="https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400"
              alt=""
              width={40}
              height={40}
              className={styles.avatar}
            />
            <span className={styles.username}>{post.username}</span>
          </div>
        </div>
        <div className={styles.imageContainer}>
          <Image
            src={post.image}
            alt=""
            fill={true}
            className={styles.image}
          />
        </div>
      </div>
      <div className={styles.content}>
        <p className={styles.text}>
          {post.content}
        </p>
      </div>
    </div>
  );
};

export default BlogPost;