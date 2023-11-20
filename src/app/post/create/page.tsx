import { FC } from 'react';
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card';
import { Button } from '@nextui-org/button';
import { Input, Textarea } from '@nextui-org/input';
import { Checkbox } from '@nextui-org/checkbox';
import { cn } from '@nextui-org/system-rsc';

const CreatePage: FC = () => {
  return (
    <div className="flex justify-center">
      <main className="m-5 flex w-full max-w-page justify-center">
        <Card className="w-full p-1">
          <CardHeader>
            <h1 className="mr-auto">Create post</h1>
            <Checkbox name="isNSFW" color="danger">
              NSFW
            </Checkbox>
          </CardHeader>
          <CardBody className="flex gap-3">
            <Input variant="bordered" placeholder="Add a title..."></Input>
            <Textarea
              variant="bordered"
              placeholder="Add a desription..."
            ></Textarea>
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
    </div>
  );
};

export default CreatePage;
