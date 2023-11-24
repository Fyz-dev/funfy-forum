import { IComments } from 'src/interface';
import { users } from './users';
import { Timestamp } from 'firebase/firestore';

export const comments: IComments = [
  {
    id: 'comment1',
    user: users[0],
    postID: 'post1',
    content:
      'Bold of you to assume someone who has 400 lambdas has tests for them… 😂',
    childComment: [
      {
        id: 'comment2',
        user: users[1],
        content:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras placerat pellentesque fringilla. Cras lobortis felis viverra, sodales metus vel, rutrum odio. Cras ante lacus, facilisis et ipsum pulvinar, imperdiet viverra urna. Curabitur turpis libero, interdum eget nulla nec, consequat placerat eros. Morbi tincidunt augue urna, a eleifend nunc tincidunt at. Vivamus orci justo, varius et luctus sit amet, faucibus quis tellus. Maecenas ut egestas tellus. Cras congue auctor tempor. Aenean rutrum, nisi nec congue accumsan, justo massa egestas elit, at faucibus tortor augue vitae odio. Nulla hendrerit scelerisque quam nec maximus. Mauris sit amet pulvinar sapien. Sed blandit, velit eget luctus posuere, risus arcu accumsan augue, et sagittis urna diam vitae tortor. Morbi pharetra velit vitae neque luctus, sed hendrerit tellus tincidunt. Vestibulum vitae ornare leo.',
        childComment: [],
        timestamp: {
          createdAt: new Timestamp(1234567890, 0),
          updatedAt: new Timestamp(1234567890, 0),
        },
      },
    ],
    timestamp: {
      createdAt: new Timestamp(1234567890, 0),
      updatedAt: new Timestamp(1234567890, 0),
    },
  },
  {
    id: 'comment3',
    user: users[2],
    postID: 'post2',
    content:
      'I can relate to that! Managing a large number of lambdas without tests can be challenging.',
    childComment: [
      {
        id: 'comment4',
        user: users[3],
        content:
          'Absolutely! Testing is crucial for maintaining a reliable and scalable serverless architecture.',
        childComment: [
          {
            id: 'comment23',
            user: users[0],
            content:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vel ex nec urna tincidunt feugiat. Fusce aliquam libero ac sem iaculis, vel feugiat ligula facilisis.',
            childComment: [
              {
                id: 'comment24',
                user: users[1],
                content:
                  'I agree! Testing is crucial for building robust and reliable serverless applications.',
                childComment: [
                  {
                    id: 'comment25',
                    user: users[0],
                    content:
                      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse potenti. Ut volutpat vehicula mi, vel efficitur libero hendrerit eu.',
                    childComment: [],
                    timestamp: {
                      createdAt: new Timestamp(1234568080, 0),
                      updatedAt: new Timestamp(1234568080, 0),
                    },
                  },
                ],
                timestamp: {
                  createdAt: new Timestamp(1234568070, 0),
                  updatedAt: new Timestamp(1234568070, 0),
                },
              },
            ],
            timestamp: {
              createdAt: new Timestamp(1234568060, 0),
              updatedAt: new Timestamp(1234568060, 0),
            },
          },
        ],
        timestamp: {
          createdAt: new Timestamp(1234567900, 0),
          updatedAt: new Timestamp(1234567900, 0),
        },
      },
    ],
    timestamp: {
      createdAt: new Timestamp(1234567900, 0),
      updatedAt: new Timestamp(1234567900, 0),
    },
  },
  {
    id: 'comment5',
    user: users[4],
    postID: 'post1',
    content:
      'Great conversation! Testing in serverless environments is indeed a hot topic these days.',
    childComment: [],
    timestamp: {
      createdAt: new Timestamp(1234567910, 0),
      updatedAt: new Timestamp(1234567910, 0),
    },
  },
  {
    id: 'comment6',
    user: users[5],
    postID: 'post1',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vitae nisi eget turpis euismod faucibus.',
    childComment: [
      {
        id: 'comment7',
        user: users[1],
        content:
          'Sed nec nunc et justo vulputate scelerisque ac ac massa. Nam eu mi elit.',
        childComment: [],
        timestamp: {
          createdAt: new Timestamp(1234567920, 0),
          updatedAt: new Timestamp(1234567920, 0),
        },
      },
    ],
    timestamp: {
      createdAt: new Timestamp(1234567920, 0),
      updatedAt: new Timestamp(1234567920, 0),
    },
  },
  {
    id: 'comment9',
    user: users[8],
    postID: 'post1',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor, libero at viverra hendrerit, elit nunc fermentum nulla, ut volutpat felis elit non urna.',
    childComment: [],
    timestamp: {
      createdAt: new Timestamp(1234567940, 0),
      updatedAt: new Timestamp(1234567940, 0),
    },
  },
  {
    id: 'comment10',
    user: users[9],
    postID: 'post1',
    content:
      "Interesting topic! I recently started learning about serverless architecture, and it's fascinating.",
    childComment: [
      {
        id: 'comment8',
        user: users[7],
        content:
          "I love the design of your website! It's so clean and user-friendly.",
        childComment: [],
        timestamp: {
          createdAt: new Timestamp(1234567930, 0),
          updatedAt: new Timestamp(1234567930, 0),
        },
      },
    ],
    timestamp: {
      createdAt: new Timestamp(1234567950, 0),
      updatedAt: new Timestamp(1234567950, 0),
    },
  },
  {
    id: 'comment11',
    user: users[9],
    postID: 'post8',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ut dolor nec elit tristique ultrices vel et leo.',
    childComment: [],
    timestamp: {
      createdAt: new Timestamp(1234567960, 0),
      updatedAt: new Timestamp(1234567960, 0),
    },
  },
  {
    id: 'comment12',
    user: users[9],
    postID: 'post9',
    content:
      'I agree! Testing is an essential part of the development process. It ensures the reliability of your code.',
    childComment: [],
    timestamp: {
      createdAt: new Timestamp(1234567970, 0),
      updatedAt: new Timestamp(1234567970, 0),
    },
  },
  {
    id: 'comment13',
    user: users[0],
    postID: 'post10',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod enim eu ex iaculis, ac hendrerit quam accumsan.',
    childComment: [],
    timestamp: {
      createdAt: new Timestamp(1234567980, 0),
      updatedAt: new Timestamp(1234567980, 0),
    },
  },
  {
    id: 'comment14',
    user: users[1],
    postID: 'post1',
    content:
      'Absolutely! Testing is crucial for maintaining a reliable and scalable serverless architecture.',
    childComment: [
      {
        id: 'comment21',
        user: users[8],
        content:
          'Proin luctus orci sit amet metus dignissim, id fringilla urna fermentum. Aenean euismod orci a ipsum ultrices, vitae scelerisque elit varius.',
        childComment: [],
        timestamp: {
          createdAt: new Timestamp(1234568040, 0),
          updatedAt: new Timestamp(1234568040, 0),
        },
      },
      {
        id: 'comment20',
        user: users[2],
        postID: 'post15',
        content:
          'The serverless paradigm opens up new possibilities for scalable and cost-effective application development.',
        childComment: [],
        timestamp: {
          createdAt: new Timestamp(1234568030, 0),
          updatedAt: new Timestamp(1234568030, 0),
        },
      },
    ],
    timestamp: {
      createdAt: new Timestamp(1234567990, 0),
      updatedAt: new Timestamp(1234567990, 0),
    },
  },
];
