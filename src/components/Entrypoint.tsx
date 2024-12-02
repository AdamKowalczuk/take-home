import { useEffect } from 'react';
import { useGetListData } from '../api/getListData';
import { Card } from './Card';
import { Spinner } from './Spinner';
import { useCardStore } from '../store/useCardStore';
import { ToggleButton } from './ToggleButton';

export const Entrypoint = () => {
  const {
    deletedCards,
    toggleShowDeleted,
    showDeleted,
    visibleCards,
    setVisibleCards,
  } = useCardStore();

  const { data, isLoading, refetch, isFetching } = useGetListData();

  useEffect(() => {
    if (data) {
      setVisibleCards(data.filter((item) => item.isVisible) ?? []);
    }
  }, [data, setVisibleCards]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="flex gap-x-16">
      <div className="w-full max-w-xl">
        <h1 className="mb-1 font-medium text-lg">
          My Awesome List ({visibleCards.length})
        </h1>
        <div className="flex flex-col gap-y-3">
          {visibleCards.map((card) => (
            <Card
              key={card.id}
              id={card.id}
              title={card.title}
              description={card.description}
            />
          ))}
        </div>
      </div>
      <div className="w-full max-w-xl">
        <div className="flex items-center justify-between">
          <h1 className="mb-1 font-medium text-lg">
            Deleted Cards ({deletedCards.length})
          </h1>
          <ToggleButton
            isToggled={showDeleted}
            onToggle={toggleShowDeleted}
            activeLabel="Hide"
            inactiveLabel="Reveal"
          />
          <ToggleButton
            isToggled={isFetching}
            onToggle={refetch}
            activeLabel="Refreshing..."
            inactiveLabel="Refresh"
          />
        </div>
        {showDeleted && (
          <div className="flex flex-col gap-y-3">
            {deletedCards.map((card) => (
              <Card key={card.id} id={card.id} title={card.title} isDeleted />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
