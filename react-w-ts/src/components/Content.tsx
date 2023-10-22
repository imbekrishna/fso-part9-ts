import { CoursePart } from '../types';
import Part from './Part';

const Content = ({ content }: { content: CoursePart[] }) => {
  return (
    <div>
      {content.map((item) => {
        return <Part key={item.name} part={item} />;
      })}
    </div>
  );
};

export default Content;
