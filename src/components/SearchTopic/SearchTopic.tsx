'use client';

import { FC } from 'react';
import { Autocomplete, AutocompleteItem } from '@nextui-org/react';
import { Search } from 'src/assets/icons';
import topicController from 'src/api/controller/TopicController';
import { ITopic } from 'src/interface';
import useAsyncList from 'src/hooks/useAsyncList';

const SearchTopic: FC = () => {
  const { data, filterText, isLoading, setFilterText } = useAsyncList<ITopic>({
    async load(filterText) {
      if (!filterText) return topicController.getByTitle('');

      const topics = await topicController.getByTitle(filterText);

      return topics;
    },
  });

  return (
    <Autocomplete
      className="max-w-xs"
      inputValue={filterText}
      isLoading={isLoading}
      items={data}
      startContent={<Search />}
      inputProps={{
        classNames: { inputWrapper: 'bg-content1 shadow-medium' },
      }}
      label="Choose a topic"
      placeholder="Search topic"
      onInputChange={setFilterText}
      onSelectionChange={() => console.log('tets')}
    >
      {item => (
        <AutocompleteItem key={item.id} className="capitalize">
          {item.title}
        </AutocompleteItem>
      )}
    </Autocomplete>
  );
};

export default SearchTopic;
