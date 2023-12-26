'use client';

import { FC, ReactNode, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Button } from '@nextui-org/button';
import { Message } from 'src/assets/icons';
import { MDXEditor } from 'src/components/MDXEditor';
import { AnimatePresence, motion } from 'framer-motion';

const ReplySection: FC<{ toolsButton?: ReactNode }> = ({ toolsButton }) => {
  const methods = useForm();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="flex flex-col items-start gap-4 overflow-hidden">
      <div className="flex flex-row">
        {toolsButton}
        <Button
          radius="full"
          className="bg-transparent p-0 text-default-600 hover:bg-default-100"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <Message />
          <span>Reply</span>
        </Button>
      </div>
      <AnimatePresence>
        {isOpen && (
          <div className="mb-5 flex w-full flex-row overflow-visible">
            <motion.div
              initial={{ translateY: '-100%', opacity: 0 }}
              animate={{ translateY: '0%', opacity: 1 }}
              exit={{ translateY: '-100%', opacity: 0 }}
              transition={{
                duration: 0.3,
                type: 'spring',
                stiffness: 400,
                damping: 20,
              }}
              className="min-h-full max-w-[1px] border-l-[1px] border-default-400 max-sm:hidden"
            />
            <FormProvider {...methods}>
              <motion.form
                initial={{ translateY: '-100%', opacity: 0 }}
                animate={{ translateY: '0%', opacity: 1 }}
                exit={{ translateY: '-90%', opacity: 0 }}
                transition={{
                  delay: 0.1,
                  duration: 0.2,
                  type: 'spring',
                  stiffness: 400,
                  damping: 20,
                }}
                className="max-w-fit overflow-hidden sm:ml-5"
                name="createComment"
                noValidate
              >
                <MDXEditor
                  withHideAnim={false}
                  withPublicButton={true}
                  onCancel={() => {
                    setIsOpen(false);
                  }}
                  name="comment"
                  markdown=""
                  placeholder="Add a comment..."
                />
              </motion.form>
            </FormProvider>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ReplySection;
