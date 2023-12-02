'use client';

import { Dispatch, FC, SetStateAction, useState } from 'react';
import { Autocomplete, AutocompleteItem } from '@nextui-org/react';
import { Search } from 'src/assets/icons';
import topicController from 'src/api/controller/TopicController';
import { ITopic } from 'src/interface';
import useAsyncList from 'src/hooks/useAsyncList';
import { Controller, useFormContext } from 'react-hook-form';
import { findInputError, getClassName } from 'src/utils';

interface ISearchTopic {
  classNames?: {
    wrapper?: string;
    input?: string;
  };
  setTopic: Dispatch<SetStateAction<ITopic | undefined>>;
}

const SearchTopic: FC<ISearchTopic> = ({ setTopic, classNames }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const { message, isInvalid } = findInputError(errors, 'topicID');

  const { data, filterText, isLoading, setFilterText } = useAsyncList<ITopic>({
    async load(filterText) {
      if (!filterText) return [];

      const topics = await topicController.getByTitle(filterText);

      return topics;
    },
  });

  const wrapper = getClassName(classNames?.wrapper);
  const input = getClassName(classNames?.input);

  return (
    <div slot="wrapper" className={`flex w-full ${wrapper}`}>
      <Controller
        name="topicID"
        control={control}
        render={({ field: { onChange, ...rest } }) => (
          <Autocomplete
            className=" lg:max-w-xs"
            variant="bordered"
            inputValue={filterText}
            isLoading={isLoading}
            items={data}
            startContent={<Search />}
            inputProps={{
              classNames: {
                inputWrapper: `shadow-medium bg-content1 ${input}`,
              },
            }}
            label="Choose a topic"
            placeholder="Search topic"
            onInputChange={setFilterText}
            onSelectionChange={key => {
              setTopic(data.find(topic => key === topic.id));
              onChange(key);
            }}
            isInvalid={isInvalid}
            errorMessage={message}
            {...rest}
          >
            {item => (
              <AutocompleteItem key={item.id} className="capitalize">
                {item.title}
              </AutocompleteItem>
            )}
          </Autocomplete>
        )}
      />
    </div>
  );
};

export default SearchTopic;
