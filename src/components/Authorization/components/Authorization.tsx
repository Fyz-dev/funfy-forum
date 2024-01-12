'use client';

import { Modal, ModalBody, ModalContent, ModalFooter } from '@nextui-org/modal';
import { Button } from '@nextui-org/button';
import { FC, useEffect } from 'react';
import { UseDisclosureReturn } from '@nextui-org/use-disclosure';
import { Tab, Tabs } from '@nextui-org/tabs';
import { Link } from '@nextui-org/link';
import { Divider } from '@nextui-org/divider';
import { FormProvider, useForm } from 'react-hook-form';
import { AuthSchemaType, AuthSchema } from 'src/validations/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Google, Github } from 'src/assets/icons';
import { useAuth } from 'src/context/Auth';
import InputLogin from './InputLogin';
import InputSignUp from './InputSignUp';
import { usePathname, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export enum EnumModeAuth {
  LOGIN = 'Login',
  SIGNUP = 'Sign up',
}

export type ModeAuth = EnumModeAuth;

type AuthProps = Pick<UseDisclosureReturn, 'isOpen' | 'onOpenChange'> & {
  mode: EnumModeAuth;
  setMode(mode: EnumModeAuth): void;
};

const Authorization: FC<AuthProps> = ({
  isOpen,
  onOpenChange,
  mode,
  setMode,
}) => {
  const {
    signInGithub,
    signInGoogle,
    signInEmailAndPassword,
    signUpEmailAndPassword,
  } = useAuth();
  const path = usePathname();
  const methods = useForm<AuthSchemaType>({
    resolver: zodResolver(AuthSchema),
  });

  const handlerGithub = async () => {
    await signInGithub(
      `${typeof window !== 'undefined' && window.location.origin}${path}`,
    );
  };

  const handlerGoogle = async () => {
    await signInGoogle(
      `${typeof window !== 'undefined' && window.location.origin}${path}`,
    );
  };

  const handlerSignInEmail = async (data: AuthSchemaType) => {
    const { error } = await signInEmailAndPassword(data.email, data.password);

    if (error) {
      methods.setError('password', {
        type: 'manual',
        message: 'Invalid email or password',
      });
      return;
    }
  };

  const handlerSignUpEmail = async (data: AuthSchemaType) => {
    if (!data.name) {
      methods.setError('name', {
        type: 'manual',
        message: 'Requied',
      });
      return;
    }

    const { error } = await signUpEmailAndPassword(
      data.name,
      data.email,
      data.password,
    );

    if (error) {
      methods.setError('email', {
        type: 'manual',
        message: 'Mail is already in use',
      });
      return;
    }

    setMode(EnumModeAuth.LOGIN);
  };

  const handlerUserWithEmail = methods.handleSubmit(async data => {
    if (mode === EnumModeAuth.LOGIN) {
      toast.promise(handlerSignInEmail(data), {
        loading: 'Logging in...',
        success: 'You are logged in!',
        error: 'You are not logged in.',
      });
      return;
    }

    handlerSignUpEmail(data);
  });

  useEffect(() => methods.reset(), [methods, isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="center"
      backdrop="blur"
    >
      <ModalContent>
        <FormProvider {...methods}>
          <form onSubmit={handlerUserWithEmail} noValidate>
            <ModalBody className="mt-10">
              <Tabs
                defaultSelectedKey={mode}
                onSelectionChange={key => {
                  setMode(key as ModeAuth);
                  methods.reset();
                }}
                fullWidth
                aria-label="Tabs form"
              >
                <Tab key={EnumModeAuth.LOGIN} title="Login">
                  <InputLogin />
                </Tab>
                <Tab key={EnumModeAuth.SIGNUP} title="Sign up">
                  <InputSignUp />
                </Tab>
              </Tabs>
            </ModalBody>
            <ModalFooter className="flex-col justify-center">
              <Button type="submit" fullWidth color="primary" className="mb-6">
                {mode}
              </Button>
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
            </ModalFooter>
          </form>
        </FormProvider>
      </ModalContent>
    </Modal>
  );
};

export default Authorization;
