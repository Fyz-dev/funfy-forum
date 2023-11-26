import { IUser } from 'src/interface/';

export const users: IUser[] = [
  {
    uid: '95Mj61BfGVeY87mYXidwm1baC8p2',
    name: 'Vlad',
    userDetails: {
      description: 'The creator of this site, and a programming enthusiast',
      socialNetwork: [
        'Twitter',
        'Instagram',
        'Telegram',
        'Reddit',
        'MyAnimeList',
      ],
    },
    email: 'user1@example.com',
    photoURL:
      'data:image/jpeg;base64,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',
    isBlocked: false,
  },
  {
    uid: 'user2',
    name: 'Nikita S',
    userDetails: {
      description:
        'This is the best friend and part-time brother of the creator of this site',
      socialNetwork: ['Facebook', 'LinkedIn', 'Telegram'],
    },
    email: 'user2@example.com',
    photoURL:
      'https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png',
    isBlocked: false,
  },
  {
    uid: 'user3',
    name: 'Raffaello',
    userDetails: {
      description:
        'Passionate about photography and travel. Enjoys capturing moments from around the world.',
      socialNetwork: ['Discord', 'Telegram'],
    },
    email: 'raffaello@example.com',
    photoURL:
      'https://timeweb.com/ru/community/article/43/4372a42395939b59d7e234e6042983f8.jpg',
    isBlocked: false,
  },
  {
    uid: 'user4',
    name: 'Alex Rodriguez',
    userDetails: {
      description:
        'Tech enthusiast and software developer. Loves coding and exploring new technologies. Find me on Twitter and Facebook!',
      socialNetwork: ['Twitter', 'Facebook'],
    },
    email: 'alex.rodriguez@example.com',
    photoURL: 'https://i.imgur.com/RPrw70n.png',
    isBlocked: false,
  },
  {
    uid: 'user5',
    name: 'Elena Smith',
    userDetails: {
      description:
        "Fitness freak and health advocate. Sharing wellness tips and workout routines. Let's connect on Instagram and LinkedIn!",
      socialNetwork: ['Instagram', 'LinkedIn'],
    },
    email: 'elena.smith@example.com',
    photoURL:
      'https://artbreeder.b-cdn.net/imgs/d5eed238823f81fa9da0298e9639.jpeg',
    isBlocked: false,
  },
  {
    uid: 'user6',
    name: 'Ivan Petrov',
    userDetails: {
      description:
        'Passionate traveler and adventurer. Documenting my journeys and experiences. Connect with me on Facebook and Twitter!',
      socialNetwork: ['Facebook', 'Twitter'],
    },
    email: 'ivan.petrov@example.com',
    photoURL:
      'https://global.discourse-cdn.com/freecodecamp/original/4X/b/9/1/b91e2f353c423ade338ccf6516b41b025b2fc3a5.png',
    isBlocked: false,
  },
  {
    uid: 'user7',
    name: 'Olga Ivanova',
    userDetails: {
      description:
        "Marketing professional with a flair for creativity. Sharing insights and trends in the marketing world. Let's connect on LinkedIn and Instagram!",
      socialNetwork: ['LinkedIn', 'Instagram'],
    },
    email: 'olga.ivanova@example.com',
    photoURL:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdd93NTtqa8wmtDBSSqkRr22xu01lSrVlIYw&usqp=CAU',
    isBlocked: false,
  },
  {
    uid: 'user8',
    name: 'Max Turner',
    userDetails: {
      description:
        'Gamer and technology geek. Streaming gaming sessions and tech reviews. Join me on Twitter and Facebook!',
      socialNetwork: ['Twitter', 'Facebook'],
    },
    email: 'max.turner@example.com',
    photoURL:
      'https://bipbap.ru/wp-content/uploads/2021/11/1afda9533ddbbf9eccdfa020f24a9ecc-730x548.jpg',
    isBlocked: false,
  },
  {
    uid: 'user9',
    name: 'Sofia Miller',
    userDetails: {
      description:
        'Art and fashion enthusiast. Showcasing creative works and fashion trends. Connect with me on Instagram and LinkedIn!',
      socialNetwork: ['Instagram', 'LinkedIn'],
    },
    email: 'sofia.miller@example.com',
    photoURL: 'https://www.example.com/sofia-miller-profile.jpg',
    isBlocked: false,
  },
  {
    uid: 'user10',
    name: 'Dmitry Volkov',
    userDetails: {
      description:
        "Sports fanatic and fitness trainer. Sharing workout routines and healthy lifestyle tips. Let's connect on Facebook and Twitter!",
      socialNetwork: ['Facebook', 'Twitter'],
    },
    email: 'dmitry.volkov@example.com',
    photoURL: 'https://www.example.com/dmitry-volkov-profile.jpg',
    isBlocked: false,
  },
];
