import { FC, useState } from 'react';
import { ListItem } from '../api/getListData';
import { DeleteButton, ExpandButton } from './Buttons';
import { ChevronUpIcon, ChevronDownIcon } from '../assets/icons/icons';
import { useCardStore } from '../store/useCardStore';

type CardProps = {
  id: ListItem['id'];
  title: ListItem['title'];
  description?: ListItem['description'];
  isDeleted?: boolean;
};

export const Card: FC<CardProps> = ({ id, title, description, isDeleted }) => {
  const { expandedCards, toggleExpand, deleteCard, revertCard } =
    useCardStore();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isCollapsing, setIsCollapsing] = useState(false);
  const isExpanded = expandedCards.includes(id);

  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => {
      deleteCard(id);
    }, 1000);
  };

  const handleCollapse = () => {
    setIsCollapsing(true);
    setTimeout(() => {
      toggleExpand(id);
      setIsCollapsing(false);
    }, 300);
  };

  return (
    <div
      className={`border border-black px-2 py-1.5 transition-all duration-1000 ease-in-out ${
        isDeleting
          ? 'max-h-0 opacity-0'
          : isExpanded
          ? 'max-h-[500px]'
          : 'max-h-[50px]'
      } overflow-hidden`}
    >
      <div className="flex justify-between mb-0.5">
        <h1 className="font-medium">{title}</h1>
        <div className="flex">
          {isDeleted ?? (
            <ExpandButton
              onClick={isExpanded ? handleCollapse : () => toggleExpand(id)}
            >
              {isExpanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
            </ExpandButton>
          )}
          {isDeleted ?? <DeleteButton onClick={handleDelete} />}

          {/* <RevertButton onClick={() => revertCard(id)} /> */}
        </div>
      </div>
      <p
        className={`text-sm transition-all duration-1000 ease-in-out ${
          isDeleting || isCollapsing
            ? 'opacity-0 max-h-0'
            : isExpanded
            ? 'opacity-100 max-h-[200px]'
            : 'opacity-0 max-h-0'
        }`}
      >
        {description}
      </p>
    </div>
  );
};

// I changed the name to Card because the file name and the component name should be consistent.
