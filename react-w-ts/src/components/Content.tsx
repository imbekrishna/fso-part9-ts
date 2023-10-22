import { CoursePart } from '../types';

const Content = ({ content }: { content: CoursePart[] }) => {
  return (
    <>
      {content.map((e) => (
        <p>
          {e.name} {e.exerciseCount}
        </p>
      ))}
    </>
  );
};

export default Content;
