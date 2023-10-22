interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CourseWDescription extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CourseWDescription {
  kind: 'basic';
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: 'group';
}

interface CoursePartBackground extends CourseWDescription {
  backgroundMaterial: string;
  kind: 'background';
}

interface CourseWRequirement extends CourseWDescription {
  requirements: string[];
  kind: 'special';
}

export type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground
  | CourseWRequirement;
