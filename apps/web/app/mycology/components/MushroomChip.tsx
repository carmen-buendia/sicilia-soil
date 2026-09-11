import { Chip } from "@sicilia-soil/ui";

interface MushroomChipProps {
  mushroom: {
    id: string;
    name: string;
    scientificName: string;
    icon: string;
    isEndemic: boolean;
  };
  active: boolean;
  onClick: () => void;
}

export function MushroomChip({ mushroom, active, onClick }: MushroomChipProps) {
  return (
    <Chip
      active={active}
      onClick={onClick}
      icon={<span className="text-2xl">{mushroom.icon}</span>}
      title={mushroom.name}
      subtitle={mushroom.scientificName}
      badge={mushroom.isEndemic ? "Endémica" : undefined}
    />
  );
}