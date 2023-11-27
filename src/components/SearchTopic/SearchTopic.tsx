'use client';

import { FC, useState } from 'react';
import { Autocomplete, AutocompleteItem } from '@nextui-org/react';
import { Search } from 'src/assets/icons';
import topicController from 'src/api/controller/TopicController';
import { ITopic } from 'src/interface';
import useAsyncList from 'src/hooks/useAsyncList';
import TopicCard from '../TopicCard/TopicCard';

interface ISearchTopic {
  className?: string;
}

const SearchTopic: FC<ISearchTopic> = ({ className = '' }) => {
  const [topic, setTopic] = useState<ITopic | undefined>(undefined);

  const { data, filterText, isLoading, setFilterText } = useAsyncList<ITopic>({
    async load(filterText) {
      if (!filterText) return topicController.getByTitle('');

      const topics = await topicController.getByTitle(filterText);

      return topics;
    },
  });

  return (
    <div slot="wrapper" className={`flex flex-col gap-5 ${className}`}>
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
        selectedKey={topic?.id}
        onSelectionChange={key =>
          setTopic(data.find(topic => key === topic.id))
        }
      >
        {item => (
          <AutocompleteItem key={item.id} className="capitalize">
            {item.title}
          </AutocompleteItem>
        )}
      </Autocomplete>
      {topic ? <TopicCard topic={topic} /> : ''}
    </div>
  );
};

export default SearchTopic;
