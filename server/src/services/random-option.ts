import payload from 'payload';

type OptionCollections = 'characters' | 'themes' | 'plots' | 'styles';

export const getRandomOptionId = async (collection: OptionCollections): Promise<string> => {
  // Can't use aggregate or count through payload so need to find a work around
  const searchForStats = await payload.find({
    collection,
    page: 1,
    limit: 1,
    depth: 1,
  });
  const totalOptions = searchForStats.totalDocs;
  const randomIndex = Math.floor(Math.random() * totalOptions);
  // Warning: Potentially could result in failure if characters are deleted between queries
  const option = await payload.find({
    collection,
    page: randomIndex,
    limit: 1,
    depth: 1,
  });
  return option.docs[0].id;
};
