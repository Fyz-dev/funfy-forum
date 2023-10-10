'use client';

import { Modal, ModalBody, ModalContent, ModalFooter } from '@nextui-org/modal';
import { Button } from '@nextui-org/button';
import { FC } from 'react';
import { UseDisclosureReturn } from '@nextui-org/use-disclosure';
import { Tab, Tabs } from '@nextui-org/tabs';
import { Link } from '@nextui-org/link';
import { Divider } from '@nextui-org/divider';

import Google from 'src/assets/icons/Google';
import Github from 'src/assets/icons/Github';
import { UserAuth } from 'src/context/Auth';
import Login from './Login';
import SignUp from './SignUp';

export type ModeAuth = 'Login' | 'Sign-up';

type AuthProps = Pick<UseDisclosureReturn, 'isOpen' | 'onOpenChange'> & {
  mode?: ModeAuth;
};

const Authorization: FC<AuthProps> = ({
  isOpen,
  onOpenChange,
  mode = 'Login',
}) => {
  const { githubSignIn, googleSignIn } = UserAuth();

  const handlerGithub = async () => {
    await githubSignIn();
  };

  const handlerGoogle = async () => {
    await googleSignIn();
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
      <ModalContent>
        {onClose => (
          <form>
            <ModalBody className=" mt-10">
              <Tabs defaultSelectedKey={mode} fullWidth aria-label="Tabs form">
                <Tab key="Login" title="Login">
                  <Login />
                </Tab>
                <Tab key="Sign-up" title="Sign up">
                  <SignUp />
                </Tab>
              </Tabs>
              <div className="inline-flex justify-center gap-4">
                <div className="w-6/12 self-center">
                  <Divider />
                </div>
                <span className="self-center whitespace-nowrap">
                  or continue with
                </span>
                <div className="w-6/12 self-center">
                  <Divider />
                </div>
              </div>
              <div className="flex h-10 justify-center gap-5 text-foreground-900">
                <Link onClick={handlerGoogle}>
                  <Google className="h-full w-min" />
                </Link>
                <Link onClick={handlerGithub}>
                  <Github className="h-full w-min text-foreground-900" />
                </Link>
              </div>
            </ModalBody>
            <ModalFooter className="justify-center">
              <Button type="submit" fullWidth color="primary" onPress={onClose}>
                Login
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
};

export default Authorization;
