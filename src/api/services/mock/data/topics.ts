import { ITopic } from 'src/interface';

export const topics: ITopic[] = [
  {
    id: 'topic1',
    userID: 'user1',
    title: 'Web Development Best Practices',
    photoURL:
      'https://b.thumbs.redditmedia.com/8RJ1zsSxLbTrSrRAhziwMynfkWVcuFNMXPsLqtGct1o.png',
    description:
      'Discuss and share the best practices for web development, including coding standards, design patterns, and optimization techniques.',
  },
  {
    id: 'topic2',
    userID: 'user9',
    photoURL:
      'https://builtin.com/cdn-cgi/image/f=auto,quality=80,width=752,height=435/https://builtin.com/sites/www.builtin.com/files/styles/byline_image/public/2021-12/machine-learning-examples-applications.png',
    title: 'Machine Learning Applications in Healthcare',
    description:
      'Explore the various applications of machine learning in healthcare, such as disease prediction, diagnostic tools, and personalized treatment plans.',
  },
  {
    id: 'topic3',
    userID: 'user1',
    photoURL:
      'https://static-00.iconduck.com/assets.00/open-book-icon-2048x2048-wuklhx59.png',
    title: 'Book Recommendations for Science Enthusiasts',
    description:
      'Share and discover interesting books related to various scientific disciplines. Discuss your favorite science books and their impact on your understanding of the world.',
  },
];
