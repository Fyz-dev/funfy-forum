'use client';

import { FC } from 'react';
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card';
import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import { Checkbox } from '@nextui-org/checkbox';
import TopicCard from 'src/components/TopicCard/TopicCard';
import { Autocomplete } from '@nextui-org/autocomplete';
import { Search } from 'src/assets/icons';
import { MDXEditor } from 'src/components/MDXEditor';

const CreatePage: FC = () => {
  return (
    <div className="m-5 flex justify-center gap-5">
      <main className=" flex w-full max-w-page justify-center">
        <Card className="w-full p-1">
          <CardHeader>
            <h1 className="mr-auto">Create a post</h1>
          </CardHeader>
          <CardBody className="flex gap-3">
            <Input variant="bordered" placeholder="Add a title..."></Input>
            <MDXEditor markdown="Hello" placeholder="Add a desription..." />
            <Checkbox name="isNSFW" color="danger">
              Is NSFW
            </Checkbox>
          </CardBody>
          <CardFooter>
            <div className="ml-auto flex gap-2">
              <Button radius="full" content="Public">
                Cancel
              </Button>
              <Button radius="full" color="primary" content="Public">
                Public
              </Button>
            </div>
          </CardFooter>
        </Card>
      </main>
      <section className="flex w-80 flex-col gap-5">
        <Autocomplete
          startContent={<Search />}
          inputProps={{
            classNames: { inputWrapper: 'bg-content1 shadow-medium' },
          }}
          label="Choose a community"
          placeholder="Search community"
        >
          {}
        </Autocomplete>
        <TopicCard />
      </section>
    </div>
  );
};

export default CreatePage;
