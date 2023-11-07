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
    title: 'Which ) or SQL?',
    content: 'At ',
  },
];

export default function Home() {
  return (
    <div className="flex justify-center">
      <main className="flex max-w-[800px] flex-col items-start gap-5 overflow-y-auto p-5">
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
      </main>
    </div>
  );
}
