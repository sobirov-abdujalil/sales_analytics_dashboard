import React from 'react';
import Select from '../../../components/ui/Select';

const TeamSelector = ({ selectedTeam, onTeamChange, teams }) => {
  const teamOptions = teams?.map(team => ({
    value: team?.id,
    label: team?.name,
    description: `${team?.memberCount} members`
  }));

  return (
    <div className="min-w-48">
      <Select
        label="Team"
        options={teamOptions}
        value={selectedTeam}
        onChange={onTeamChange}
        placeholder="Select team"
      />
    </div>
  );
};

export default TeamSelector;