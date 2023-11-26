'use client';

import { FC } from 'react';

import { Autocomplete, AutocompleteItem } from '@nextui-org/react';
import { useAsyncList } from '@react-stately/data';
import { Search } from 'src/assets/icons';
import topicController from 'src/api/controller/TopicController';
import { ITopic } from 'src/interface';

const SearchTopic: FC = () => {
  const { filterText, isLoading, items, setFilterText } = useAsyncList<ITopic>({
    async load({ filterText }) {
      if (!filterText) return { items: [] };

      const topics = await topicController.getByTitle(filterText);

      return {
        items: topics,
      };
    },
  });

  return (
    <Autocomplete
      className="max-w-xs"
      inputValue={filterText}
      isLoading={isLoading}
      items={items}
      startContent={<Search />}
      inputProps={{
        classNames: { inputWrapper: 'bg-content1 shadow-medium' },
      }}
      label="Choose a community"
      placeholder="Search community"
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
