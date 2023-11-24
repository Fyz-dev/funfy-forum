import { Timestamp } from 'firebase/firestore';
import { IPosts } from 'src/interface';
import { users } from './users';
import { topics } from './topics';

export const posts: IPosts = [
  {
    id: 'post1',
    user: users[1],
    topic: topics[0],
    title: 'Post One Title',
    imageURL: 'https://techcrunch.com/wp-content/uploads/2015/04/codecode.jpg',
    content: 'Content for Post One',
    isNSFW: false,
    commentCount: 2,
    timestamp: {
      createdAt: new Timestamp(1234567890, 0),
      updatedAt: new Timestamp(1234567890, 0),
    },
  },
  {
    id: 'post2',
    user: users[0],
    topic: topics[1],
    title: 'Praesent ornare sed urna sed bibendum. ',
    imageURL:
      'https://upload.wikimedia.org/wikipedia/commons/b/b6/Mount_Everest_as_seen_from_Drukair2_PLW_edit_Cropped.jpg',
    content:
      'Content for Post Two Phasellus aliquam venenatis lectus, vel sollicitudin massa ornare vel. Nulla vitae risus tortor. Mauris nec tortor pretium, ultrices ex vitae, imperdiet orci. In faucibus egestas condimentum. Sed id lobortis erat, nec ornare metus. Nulla sed est vel lacus fringilla maximus et a leo. Duis sed sem aliquam purus vehicula tempus. Integer quis tincidunt ex. Nunc sed turpis semper, venenatis eros ultricies, tristique eros. Sed eu neque a magna hendrerit imperdiet. Vestibulum et neque lacus. Morbi finibus mauris sed ante mollis, at sollicitudin est blandit. Etiam gravida maximus ante, eget varius tellus imperdiet vel. Phasellus eu enim at nulla imperdiet scelerisque sed vel mauris. Nulla auctor tortor feugiat dignissim finibus. Quisque vitae felis dui. Nulla eu orci non magna vestibulum bibendum molestie quis dui. In quis commodo magna. In in aliquet neque, a rutrum mauris. Nulla tincidunt, sem eu pellentesque posuere, est purus vestibulum urna, nec mattis purus sapien in odio. Aenean tincidunt ex a urna varius dictum. Vestibulum quis augue risus. Aenean hendrerit eleifend leo nec vestibulum. Vestibulum eleifend augue id lacus auctor, a posuere risus convallis. Praesent libero massa, vulputate in mattis a, dignissim ultricies lorem.',
    isNSFW: false,
    commentCount: 5,
    timestamp: {
      createdAt: new Timestamp(1234567890, 0),
      updatedAt: new Timestamp(1234567890, 0),
    },
  },
  {
    id: 'post3',
    user: users[2],
    topic: topics[2],
    title: 'Exploring New Horizons',
    imageURL: 'https://example.com/image3.jpg',
    content:
      'Embarking on a journey to discover uncharted territories and broaden our perspectives.',
    isNSFW: false,
    commentCount: 8,
    timestamp: {
      createdAt: new Timestamp(1234567890, 0),
      updatedAt: new Timestamp(1234567890, 0),
    },
  },
  {
    id: 'post4',
    user: users[3],
    topic: topics[0],
    title: 'The Art of Coding',
    imageURL: 'https://example.com/image4.jpg',
    content:
      'Delving into the intricate world of coding, where creativity meets functionality.',
    isNSFW: false,
    commentCount: 12,
    timestamp: {
      createdAt: new Timestamp(1234567890, 0),
      updatedAt: new Timestamp(1234567890, 0),
    },
  },
  {
    id: 'post5',
    user: users[4],
    topic: topics[0],
    title: 'Capturing Moments',
    imageURL: 'https://example.com/image5.jpg',
    content:
      'Exploring the art of photography and capturing the essence of fleeting moments.',
    isNSFW: false,
    commentCount: 6,
    timestamp: {
      createdAt: new Timestamp(1234567890, 0),
      updatedAt: new Timestamp(1234567890, 0),
    },
  },
  {
    id: 'post6',
    user: users[5],
    topic: topics[2],
    title: 'The Science of Space',
    imageURL: 'https://example.com/image6.jpg',
    content:
      'Unraveling the mysteries of the cosmos and the wonders hidden beyond our atmosphere.',
    isNSFW: false,
    commentCount: 10,
    timestamp: {
      createdAt: new Timestamp(1234567890, 0),
      updatedAt: new Timestamp(1234567890, 0),
    },
  },
  {
    id: 'post7',
    user: users[6],
    topic: topics[2],
    title: 'Culinary Adventures',
    imageURL: 'https://example.com/image7.jpg',
    content:
      'Embarking on a gastronomic journey to savor diverse flavors and culinary delights.',
    isNSFW: false,
    commentCount: 15,
    timestamp: {
      createdAt: new Timestamp(1234567890, 0),
      updatedAt: new Timestamp(1234567890, 0),
    },
  },
  {
    id: 'post8',
    user: users[0],
    topic: topics[1],
    title: 'Innovation in Technology',
    imageURL: 'https://example.com/image8.jpg',
    content:
      'Exploring the latest technological innovations that shape our modern world.',
    isNSFW: false,
    commentCount: 7,
    timestamp: {
      createdAt: new Timestamp(1234567890, 0),
      updatedAt: new Timestamp(1234567890, 0),
    },
  },
  {
    id: 'post9',
    user: users[8],
    topic: topics[1],
    title: 'Musical Odyssey',
    imageURL: 'https://example.com/image9.jpg',
    content:
      'Embarking on a musical journey through different genres and the power of melodies.',
    isNSFW: false,
    commentCount: 20,
    timestamp: {
      createdAt: new Timestamp(1234567890, 0),
      updatedAt: new Timestamp(1234567890, 0),
    },
  },
  {
    id: 'post10',
    user: users[0],
    topic: topics[2],
    title: "Nature's Beauty",
    imageURL: 'https://example.com/image10.jpg',
    content:
      'Appreciating the breathtaking beauty of nature and the wonders that surround us.',
    isNSFW: false,
    commentCount: 3,
    timestamp: {
      createdAt: new Timestamp(1234567890, 0),
      updatedAt: new Timestamp(1234567890, 0),
    },
  },
];
