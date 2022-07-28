import EntryRow from './EntryRow';
import { Entry } from '../types';

const Entries = ({ entries }: { entries: Entry[]}) => {
  return (
    <>
      {entries.map(data => <EntryRow key={data.id} entry={data} />)}
    </>
  );
};

export default Entries;