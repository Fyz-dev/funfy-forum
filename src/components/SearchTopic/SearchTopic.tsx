'use client';

import { FC, useState } from 'react';
import { Autocomplete, AutocompleteItem } from '@nextui-org/react';
import { Search } from 'src/assets/icons';
import topicController from 'src/api/controller/TopicController';
import { ITopic } from 'src/interface';
import useAsyncList from 'src/hooks/useAsyncList';
import TopicCard from '../TopicCard/TopicCard';
import { Controller, useFormContext } from 'react-hook-form';
import { findInputError } from 'src/utils';

interface ISearchTopic {
  className?: string;
}

const SearchTopic: FC<ISearchTopic> = ({ className = '' }) => {
  const [topic, setTopic] = useState<ITopic | undefined>(undefined);
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

  return (
    <div slot="wrapper" className={`flex flex-col gap-5 ${className}`}>
      <Controller
        name="topicID"
        control={control}
        render={({ field: { onChange, ...rest } }) => (
          <Autocomplete
            className="max-w-xs"
            inputValue={filterText}
            isLoading={isLoading}
            items={data}
            startContent={<Search />}
            inputProps={{
              classNames: {
                inputWrapper: `shadow-medium ${
                  isInvalid ? 'bg-danger-100' : 'bg-content1'
                }`,
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
      {topic ? <TopicCard topic={topic} /> : ''}
    </div>
  );
};

export default SearchTopic;
