import { Entry } from '../types';

const EntryRow = ({ entry }: { entry: Entry }) => {
  const style = {
    border: '1px solid black',
    borderRadius: '10px',
    padding: '10px'
  };

  switch (entry.type) {
    case 'HealthCheck':
      return (
        <div style={style}>
          <p>{entry.date}</p>
          <i>{entry.description}</i>
          <p>diagnose by {entry.specialist}</p>
        </div>
      );
    case 'OccupationalHealthcare':
      return (
        <div style={style}>
          <p>{entry.date}{entry.employerName}</p>
          <i>{entry.description}</i>
          <p>diagnose by {entry.specialist}</p>
        </div>
      );
    case 'Hospital':
      return (
        <div style={style}>
          <p>{entry.date}</p>
          <i>{entry.description}</i>
          <p>diagnose by {entry.specialist}</p>
        </div>
      );
    default:
      return <p>123123</p>;
  }
};

export default EntryRow;