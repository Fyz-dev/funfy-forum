import { FC } from 'react';
import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/card';
import { Button } from '@nextui-org/button';
import { Avatar } from '@nextui-org/avatar';

const TopicCard: FC = () => {
  return (
    <Card className="w-80 self-start">
      <CardHeader>
        <div className="mr-auto inline-flex items-center gap-2">
          <Avatar
            radius="full"
            size="sm"
            src="https://b.thumbs.redditmedia.com/8RJ1zsSxLbTrSrRAhziwMynfkWVcuFNMXPsLqtGct1o.png"
          />
          <h1>Node.js</h1>
        </div>
        <Button radius="full" className="self-end" color="primary">
          Join
        </Button>
      </CardHeader>
      <CardBody className="overflow-hidden p-3 py-0 text-small text-default-400">
        <p className="text-left">
          A community for discussing anything related to the React UI framework
          and its ecosystem. Join the Reactiflux Discord (reactiflux.com) for
          additional React discussion and help.
        </p>
      </CardBody>
      <CardFooter className="flex flex-col items-start text-small text-default-400">
        <span className="text-foreground">367K</span>
        <span>Members</span>
      </CardFooter>
    </Card>
  );
};

export default TopicCard;
