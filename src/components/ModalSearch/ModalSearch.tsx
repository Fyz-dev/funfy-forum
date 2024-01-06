'use client';

import { Modal, ModalContent, useDisclosure } from '@nextui-org/modal';
import { Card, CardHeader, CardBody } from '@nextui-org/card';
import { FC, useEffect, useRef, useState } from 'react';
import { Input } from '@nextui-org/input';
import { Search } from 'src/assets/icons';
import { Button } from '@nextui-org/button';
import {
  getPosts,
  searchPostByTitle,
  searchTopicsByName,
  searchUsersByName,
} from 'src/api/supabase';
import { IPosts, ITopic, IUser } from 'src/interface';
import { Post } from '../Post';
import { usePathname } from 'next/navigation';
import { Avatar } from '@nextui-org/avatar';
import Link from 'next/link';
import { toTopic, toUser } from 'src/utils/paths';
import { Empty } from '../ui/Empty';

const ModalSearch: FC<
  Pick<ReturnType<typeof useDisclosure>, 'isOpen' | 'onOpenChange' | 'onClose'>
> = ({ isOpen, onOpenChange, onClose }) => {
  const [searchText, setSearchText] = useState('');
  const [users, setUsers] = useState<IUser[]>([]);
  const [posts, setPosts] = useState<IPosts>([]);
  const [topics, setTopics] = useState<ITopic[]>([]);

  const path = usePathname();
  const timeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    onClose();

    //eslint-disable-next-line
  }, [path]);

  useEffect(() => {
    if (searchText === '') {
      setUsers([]);
      setTopics([]);
      getPosts('new').then(data => setPosts(data));
    } else {
      searchUsersByName(searchText).then(data => setUsers(data));
      searchPostByTitle(searchText).then(data => setPosts(data));
      searchTopicsByName(searchText).then(data => setTopics(data));
    }
  }, [searchText]);

  const handleChange = (value: string) => {
    if (timeout.current) clearTimeout(timeout.current);

    timeout.current = setTimeout(function () {
      setSearchText(value);
    }, 500);
  };

  return (
    <Modal
      backdrop="blur"
      placement="top"
      size="4xl"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      hideCloseButton
      className="rounded-none bg-transparent shadow-none max-sm:m-0 max-sm:h-full sm:max-h-[calc(100%-8rem)]"
    >
      <ModalContent>
        {onClose => (
          <>
            <Card className="gap-3 overflow-hidden p-0 max-sm:gap-0 max-sm:rounded-none sm:bg-transparent">
              <Card className="min-h-20 shadow-none max-sm:rounded-none max-sm:border-[1px] max-sm:border-b-divider">
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
              <Card className="p-3 shadow-none">
                <CardBody className="no-scrollbar min-h-96 gap-4 p-0">
                  {users.length === 0 &&
                    posts.length === 0 &&
                    topics.length === 0 && <Empty></Empty>}
                  {users.length !== 0 && (
                    <div className="flex flex-col gap-3">
                      <h1 className="text-default-500">Users</h1>
                      <div className="flex flex-row flex-wrap gap-2">
                        {users.map(user => (
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
                      </div>
                    </div>
                  )}
                  {topics.length !== 0 && (
                    <div className="flex flex-col gap-3">
                      <h1 className="text-default-500">Topics</h1>
                      <div className="flex flex-col gap-2">
                        {topics.map(topic => (
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
                      </div>
                    </div>
                  )}
                  {posts.length !== 0 && (
                    <div className="flex flex-col gap-3">
                      <h1 className="text-default-500">
                        {searchText ? 'Posts' : 'New posts'}
                      </h1>
                      <div className="flex flex-col gap-2">
                        {posts.map(post => (
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
