export const convertSecondsToDate = (createAt) => {
  const milliseconds = createAt.seconds * 1000 + createAt.nanoseconds / 1e6;
  const date = new Date(milliseconds);
  return date.toDateString();
};

export const generateSkeleton = (num) => {
  const length = num || 9;

  return Array.from({ length }, () => ({
    jobLocation: "-----------",
    company: "-----------",
    status: "-----------",
    position: "-----------",
    id: "-----------",
    createAt: "-----------",
    jobType: "-----------",
  }));
};
