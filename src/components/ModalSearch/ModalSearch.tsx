'use client';

import { Modal, ModalContent, useDisclosure } from '@nextui-org/modal';
import { Card, CardHeader, CardBody } from '@nextui-org/card';
import {
  Dispatch,
  FC,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Input } from '@nextui-org/input';
import { Search } from 'src/assets/icons';
import { Button } from '@nextui-org/button';
import {
  getPosts,
  searchPostByTitle,
  searchTopicsByName,
  searchUsersByName,
} from 'src/api/supabase';
import { IPost, ITopic, IUser } from 'src/interface';
import { Post } from '../Post';
import { usePathname } from 'next/navigation';
import { Avatar } from '@nextui-org/avatar';
import Link from 'next/link';
import { toTopic, toUser } from 'src/utils/paths';

// The actual displayed value will be one less,
// since we are asking for one more to understand whether the show more button should be displayed
const SIZEPAGE = 4;
const defaultData = {
  data: [],
  resLenght: 0,
};

type ResponsData<T> = { data: T[]; resLenght: number };

const loadMoreData = <T,>(
  sourceArray: ResponsData<T>,
  searchText: string,
  searchFunction: (
    text: string,
    numberPage?: number,
    sizePage?: number,
  ) => Promise<T[]>,
  pageRef: MutableRefObject<number>,
  setData: Dispatch<SetStateAction<ResponsData<T>>>,
) => {
  searchFunction(searchText, (pageRef.current += 1), SIZEPAGE).then(data =>
    setData({
      data: sourceArray.data.concat(data.slice(0, -1)),
      resLenght: data.length,
    }),
  );
};

const ButtonMore: FC<{ fc: () => void }> = ({ fc }) => {
  return (
    <Button
      variant="flat"
      color="primary"
      radius="full"
      className="mr-auto"
      onClick={fc}
    >
      More...
    </Button>
  );
};

const ModalSearch: FC<
  Pick<ReturnType<typeof useDisclosure>, 'isOpen' | 'onOpenChange' | 'onClose'>
> = ({ isOpen, onOpenChange, onClose }) => {
  const [searchText, setSearchText] = useState('');
  const [users, setUsers] = useState<ResponsData<IUser>>(defaultData);
  const [posts, setPosts] = useState<ResponsData<IPost>>(defaultData);
  const [topics, setTopics] = useState<ResponsData<ITopic>>(defaultData);
  const userPage = useRef<number>(1);
  const topicPage = useRef<number>(1);
  const postPage = useRef<number>(1);
  const timeout = useRef<NodeJS.Timeout | null>(null);

  const path = usePathname();

  useEffect(() => {
    onClose();

    //eslint-disable-next-line
  }, [path]);

  useEffect(() => {
    if (searchText === '') {
      setUsers(defaultData);
      setTopics(defaultData);
      getPosts('new', 1, 5).then(data =>
        setPosts({ data: data, resLenght: data.length }),
      );
    } else {
      searchUsersByName(searchText, 1, SIZEPAGE).then(data =>
        setUsers({ data: data.slice(0, -1), resLenght: data.length }),
      );
      searchPostByTitle(searchText, 1, SIZEPAGE).then(data =>
        setPosts({ data: data.slice(0, -1), resLenght: data.length }),
      );
      searchTopicsByName(searchText, 1, SIZEPAGE).then(data =>
        setTopics({ data: data.slice(0, -1), resLenght: data.length }),
      );
    }

    //eslint-disable-next-line
  }, [searchText]);

  useEffect(() => {
    if (!isOpen) setSearchText('');
  }, [isOpen]);

  const handleChange = useMemo(
    () => (value: string) => {
      if (timeout.current) clearTimeout(timeout.current);

      userPage.current = 1;
      topicPage.current = 1;
      postPage.current = 1;

      timeout.current = setTimeout(() => {
        setSearchText(value);
      }, 500);
    },
    [],
  );

  return (
    <Modal
      backdrop="blur"
      placement="top"
      size="4xl"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      hideCloseButton
      className="rounded-none bg-transparent shadow-none max-sm:m-0 max-sm:min-h-full sm:max-h-[calc(100%-8rem)]"
    >
      <ModalContent>
        {onClose => (
          <>
            <Card className="gap-3 overflow-hidden p-0 max-sm:gap-0 max-sm:rounded-none sm:bg-transparent">
              {/* <---- Search ----> */}
              <Card className="min-h-20 shadow-none max-sm:rounded-none max-sm:border-b-[1px] max-sm:border-b-divider">
                <CardHeader className="gap-2">
                  <Input
                    classNames={{
                      inputWrapper:
                        'bg-transparent p-0 shadow-none data-[hover=true]:!bg-transparent hover group[data-focus=true]:!bg-transparent group-data-[focus=true]:!bg-transparent',
                      innerWrapper: 'gap-2',
                    }}
                    startContent={<Search className="h-6 w-6" />}
                    //   endContent={<Kbd>Esc</Kbd>}
                    placeholder="Type to search..."
                    onValueChange={handleChange}
                    autoFocus
                  />
                  <Button
                    onClick={onClose}
                    variant="flat"
                    radius="full"
                    color="primary"
                  >
                    Close
                  </Button>
                </CardHeader>
              </Card>

              {/* <---- Content ----> */}
              <Card className="py-3 shadow-none max-sm:min-h-[calc(100vh-5.1rem)]">
                <CardBody className="no-scrollbar min-h-96 gap-4 px-3">
                  {/* <---- Not found ----> */}
                  {users.data.length === 0 &&
                    posts.data.length === 0 &&
                    topics.data.length === 0 && (
                      <div className="flex min-h-96 items-center justify-center text-center">
                        <p>No results were found for your request</p>
                      </div>
                    )}

                  {/* <---- Users ----> */}
                  {users.data.length !== 0 && (
                    <div className="flex flex-col gap-3">
                      <h1 className="text-default-500">Users</h1>
                      <div className="flex flex-row flex-wrap gap-2">
                        {users.data.map(user => (
                          <Link
                            href={toUser(user.uid)}
                            key={user.uid}
                            className="inline-flex max-w-min select-none items-center gap-2 rounded-full bg-default-100 pr-3 transition-all hover:scale-[1.01] hover:bg-default-200"
                          >
                            <Avatar src={user.photoURL} />
                            <span className="whitespace-nowrap">
                              {user.name}
                            </span>
                          </Link>
                        ))}
                        {users.resLenght === SIZEPAGE && (
                          <ButtonMore
                            fc={() =>
                              loadMoreData(
                                users,
                                searchText,
                                searchUsersByName,
                                userPage,
                                setUsers,
                              )
                            }
                          />
                        )}
                      </div>
                    </div>
                  )}

                  {/* <---- Topics ----> */}
                  {topics.data.length !== 0 && (
                    <div className="flex flex-col gap-3">
                      <h1 className="text-default-500">Topics</h1>
                      <div className="flex flex-col gap-2">
                        {topics.data.map(topic => (
                          <Link
                            href={toTopic(topic.id)}
                            className="inline-flex h-auto w-full items-center gap-2 rounded-large bg-default-100 p-3 transition-all hover:scale-[1.01] hover:bg-default-200"
                            key={topic.id}
                          >
                            <Avatar src={topic.photoURL} />
                            <div>
                              <h1>{topic.name}</h1>
                            </div>
                          </Link>
                        ))}
                        {topics.resLenght === SIZEPAGE && (
                          <ButtonMore
                            fc={() =>
                              loadMoreData(
                                topics,
                                searchText,
                                searchTopicsByName,
                                topicPage,
                                setTopics,
                              )
                            }
                          />
                        )}
                      </div>
                    </div>
                  )}

                  {/* <---- Posts ----> */}
                  {posts.data.length !== 0 && (
                    <div className="flex flex-col gap-3">
                      <h1 className="text-default-500">
                        {searchText ? 'Posts' : 'New posts'}
                      </h1>
                      <div className="flex flex-col gap-2">
                        {posts.data.map(post => (
                          <Post
                            key={post.id}
                            post={post}
                            classNames={{
                              card: 'hover:bg-default-200 hover:scale-[1.01] bg-default-100 shadow-none',
                            }}
                            hideDescription
                          />
                        ))}
                      </div>
                      {posts.resLenght === SIZEPAGE && (
                        <ButtonMore
                          fc={() =>
                            loadMoreData(
                              posts,
                              searchText,
                              searchPostByTitle,
                              postPage,
                              setPosts,
                            )
                          }
                        />
                      )}
                    </div>
                  )}
                </CardBody>
                <div className="absolute inset-x-0 top-0 mt-2 min-h-5 bg-gradient-to-t from-transparent to-content1 to-90%" />
                <div className="absolute inset-x-0 bottom-0 mb-3 min-h-5 bg-gradient-to-b from-transparent to-content1 to-90%" />
              </Card>
            </Card>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ModalSearch;
