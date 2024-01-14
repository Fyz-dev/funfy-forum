'use client';

import { Dispatch, FC, SetStateAction, useRef, useState } from 'react';
import {
  Autocomplete,
  AutocompleteItem,
  AutocompleteSection,
} from '@nextui-org/autocomplete';
import { Hashtag, Search } from 'src/assets/icons';
import { ITopic } from 'src/interface';
import useAsyncList from 'src/hooks/useAsyncList';
import { Controller, useFormContext } from 'react-hook-form';
import { findInputError } from 'src/utils';
import { getTopics, searchTopicsByName } from 'src/api/supabase';
import { Avatar } from '@nextui-org/avatar';
import { Button } from '@nextui-org/button';
import { cn } from '@nextui-org/react';
import Link from 'next/link';
import { toCreatTopic } from 'src/utils/paths';

interface ISearchTopic {
  classNames?: {
    wrapper?: string;
    input?: string;
  };
  topic: ITopic | undefined;
  setTopic: Dispatch<SetStateAction<ITopic | undefined>>;
}

const SearchTopic: FC<ISearchTopic> = ({ topic, setTopic, classNames }) => {
  const [isDefaultValue, setIsDefaultValue] = useState<boolean>(true);
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const { data, isLoading, setFilterText } = useAsyncList<ITopic>({
    async load(filterText) {
      if (!filterText) {
        setIsDefaultValue(true);
        return await getTopics('new', 1, 10);
      }

      setIsDefaultValue(false);
      const topics = await searchTopicsByName(filterText, 1, 10);

      return topics;
    },
  });
  const timeout = useRef<NodeJS.Timeout | null>(null);
  const { message, isInvalid } = findInputError(errors, 'topicID');

  const handleSearch = (value: string) => {
    if (timeout.current) clearTimeout(timeout.current);

    timeout.current = setTimeout(() => {
      setFilterText(value);
    }, 500);
  };

  return (
    <div slot="wrapper" className={cn('flex w-full', classNames?.wrapper)}>
      <Controller
        name="topicID"
        control={control}
        render={({ field: { onChange, ...rest } }) => (
          <Autocomplete
            label="Choose a topic"
            placeholder="Search topic"
            variant="bordered"
            isLoading={isLoading}
            items={data}
            isInvalid={isInvalid}
            errorMessage={message}
            startContent={
              topic ? (
                <Avatar
                  className="max-h-5 max-w-5"
                  size="sm"
                  src={topic.photoURL}
                  fallback={<Hashtag className="text-primary" />}
                />
              ) : (
                <Search />
              )
            }
            inputProps={{
              classNames: {
                inputWrapper: cn(
                  'shadow-medium bg-content1',
                  classNames?.input,
                ),
              },
            }}
            onInputChange={handleSearch}
            onSelectionChange={key => {
              setTopic(data.find(topic => key === topic.id));

              onChange(key);
            }}
            disabledKeys={['not-found']}
            {...rest}
          >
            {data.length !== 0 ? (
              <AutocompleteSection
                title={isDefaultValue ? 'New topics' : 'Topics'}
              >
                {data.map(item => (
                  <AutocompleteItem
                    key={item.id}
                    startContent={
                      <Avatar
                        size="sm"
                        src={item.photoURL}
                        fallback={<Hashtag className="h-5 w-5 text-primary" />}
                      />
                    }
                  >
                    {item.name}
                  </AutocompleteItem>
                ))}
              </AutocompleteSection>
            ) : (
              <AutocompleteItem
                key="not-found"
                textValue="not-found"
                className="opacity-100"
              >
                <div className="flex flex-col items-center">
                  <span className="opacity-disabled">
                    Didn&apos;t find what you were looking for?
                  </span>
                  <Button
                    as={Link}
                    href={toCreatTopic()}
                    target="_blanket"
                    size="sm"
                    color="primary"
                    variant="light"
                    radius="full"
                    className="pointer-events-auto select-all text-small"
                  >
                    Create new
                  </Button>
                </div>
              </AutocompleteItem>
            )}
          </Autocomplete>
        )}
      />
    </div>
  );
};

export default SearchTopic;
