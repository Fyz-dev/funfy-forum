import Post from 'src/components/Post/Post';

const posts = [
  {
    topic: 'Node.js',
    topicPhotoURL:
      'https://b.thumbs.redditmedia.com/8RJ1zsSxLbTrSrRAhziwMynfkWVcuFNMXPsLqtGct1o.png',
    user: 'Fyz',
    title:
      'Which database is better suited for this project, NoSQL (specifically MongoDB) or SQL?',
    content:
      "At the moment I'm thinking about developing a project for maintaining anime lists, there will be the ability to rate anime, write comments (with support for replies), as well as a small forum for communication and, of course, there will be the ability to add to your lists. Before that I only worked with SQL databases, I never had any experience with mongo. I'm curious, what is your opinion on this matter?",
  },
  {
    topic: 'Node.js',
    topicPhotoURL:
      'https://b.thumbs.redditmedia.com/8RJ1zsSxLbTrSrRAhziwMynfkWVcuFNMXPsLqtGct1o.png',
    user: 'Fyz',
    title:
      'Which database is better suited for this project, NoSQL (specifically MongoDB) or SQL?',
    content:
      "At the moment I'm thinking about developing a project for maintaining anime lists, there will be the ability to rate anime, write comments (with support for replies), as well as a small forum for communication and, of course, there will be the ability to add to your lists. Before that I only worked with SQL databases, I never had any experience with mongo. I'm curious, what is your opinion on this matter?",
  },
  {
    topic: 'Node.js',
    topicPhotoURL:
      'https://b.thumbs.redditmedia.com/8RJ1zsSxLbTrSrRAhziwMynfkWVcuFNMXPsLqtGct1o.png',
    user: 'Fyz',
    title:
      'Which database is better suited for this project, NoSQL (specifically MongoDB) or SQL?',
    content:
      "At the moment I'm thinking about developing a project for maintaining anime lists, there will be the ability to rate anime, write comments (with support for replies), as well as a small forum for communication and, of course, there will be the ability to add to your lists. Before that I only worked with SQL databases, I never had any experience with mongo. I'm curious, what is your opinion on this matter?",
  },
  {
    topic: 'Node.js',
    topicPhotoURL:
      'https://b.thumbs.redditmedia.com/8RJ1zsSxLbTrSrRAhziwMynfkWVcuFNMXPsLqtGct1o.png',
    user: 'Fyz',
    title:
      'Which database is better suited for this project, NoSQL (specifically MongoDB) or SQL?',
    content:
      "At the moment I'm thinking about developing a project for maintaining anime lists, there will be the ability to rate anime, write comments (with support for replies), as well as a small forum for communication and, of course, there will be the ability to add to your lists. Before that I only worked with SQL databases, I never had any experience with mongo. I'm curious, what is your opinion on this matter?",
  },
  {
    topic: 'Node.js',
    topicPhotoURL:
      'https://b.thumbs.redditmedia.com/8RJ1zsSxLbTrSrRAhziwMynfkWVcuFNMXPsLqtGct1o.png',
    user: 'Fyz',
    title:
      'Which database is better suited for this project, NoSQL (specifically MongoDB) or SQL?',
    content:
      "At the moment I'm thinking about developing a project for maintaining anime lists, there will be the ability to rate anime, write comments (with support for replies), as well as a small forum for communication and, of course, there will be the ability to add to your lists. Before that I only worked with SQL databases, I never had any experience with mongo. I'm curious, what is your opinion on this matter?",
  },
  {
    topic: 'Node.js',
    topicPhotoURL:
      'https://b.thumbs.redditmedia.com/8RJ1zsSxLbTrSrRAhziwMynfkWVcuFNMXPsLqtGct1o.png',
    user: 'Fyz',
    title:
      'Which database is better suited for this project, NoSQL (specifically MongoDB) or SQL?',
    content:
      "At the moment I'm thinking about developing a project for maintaining anime lists, there will be the ability to rate anime, write comments (with support for replies), as well as a small forum for communication and, of course, there will be the ability to add to your lists. Before that I only worked with SQL databases, I never had any experience with mongo. I'm curious, what is your opinion on this matter?",
  },
];

export default function Home() {
  return (
    <main className="flex justify-center">
      <section className="flex min-h-screen max-w-[800px] flex-col items-center gap-5 p-5">
        {posts.map((item, index) => {
          return (
            <Post
              key={index}
              topic={item.topic}
              topicPhotoURL={item.topicPhotoURL}
              user={item.user}
              title={item.title}
              content={item.content}
            />
          );
        })}
      </section>
    </main>
  );
}
