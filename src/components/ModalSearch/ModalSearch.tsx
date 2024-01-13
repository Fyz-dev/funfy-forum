'use client';

import { Modal, ModalContent, useDisclosure } from '@nextui-org/modal';
import { Card, CardHeader, CardBody } from '@nextui-org/card';
import { FC, useEffect, useMemo, useRef, useState } from 'react';
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
import { usePathname } from 'next/navigation';
import { loadMoreData } from './utils/loadMoreData';
import Posts from './components/Posts';
import Topics from './components/Topics';
import Users from './components/Users';
import ButtonMore from './components/ButtonMore';

const SIZEPAGE = 3;
const defaultData = {
  data: [],
  resLenght: 0,
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
      searchUsersByName(searchText, 1, SIZEPAGE + 1).then(data =>
        setUsers({
          data: SIZEPAGE + 1 === data.length ? data.slice(0, -1) : data,
          resLenght: data.length,
        }),
      );
      searchPostByTitle(searchText, 1, SIZEPAGE + 1).then(data =>
        setPosts({
          data: SIZEPAGE + 1 === data.length ? data.slice(0, -1) : data,
          resLenght: data.length,
        }),
      );
      searchTopicsByName(searchText, 1, SIZEPAGE + 1).then(data =>
        setTopics({
          data: SIZEPAGE + 1 === data.length ? data.slice(0, -1) : data,
          resLenght: data.length,
        }),
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
                        <Users users={users} />
                        {users.resLenght > SIZEPAGE && (
                          <ButtonMore
                            fc={() =>
                              loadMoreData(
                                users,
                                searchText,
                                searchUsersByName,
                                userPage,
                                setUsers,
                                SIZEPAGE,
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
                      <Topics topics={topics} />
                      {topics.resLenght > SIZEPAGE && (
                        <ButtonMore
                          fc={() =>
                            loadMoreData(
                              topics,
                              searchText,
                              searchTopicsByName,
                              topicPage,
                              setTopics,
                              SIZEPAGE,
                            )
                          }
                        />
                      )}
                    </div>
                  )}

                  {/* <---- Posts ----> */}
                  {posts.data.length !== 0 && (
                    <div className="flex flex-col gap-3">
                      <h1 className="text-default-500">
                        {searchText ? 'Posts' : 'New posts'}
                      </h1>
                      <Posts posts={posts} />
                      {posts.resLenght > SIZEPAGE && searchText !== '' && (
                        <ButtonMore
                          fc={() =>
                            loadMoreData(
                              posts,
                              searchText,
                              searchPostByTitle,
                              postPage,
                              setPosts,
                              SIZEPAGE,
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
