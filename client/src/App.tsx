import useCollections from "./hooks/useCollections";
import useRating from "./hooks/useRating";
import AlertMessages from "./components/alerts";
import Header from "./components/header";
import CollectionSelector from "./components/collection-selector";
import Collection from "./components/collection";

export default function App() {
  const collections = useCollections();
  const ratings = useRating({ 
    collectionId: collections.currentCollection?.id || null 
  });

  // Combine error/success messages from both hooks
  const error = collections.error || ratings.error;
  const success = collections.success || ratings.success;

  return (
    <div className="min-h-screen w-[100vw] bg-gray-900 text-white">
      <div className="max-w-full mx-auto px-8 py-2">
        {/* Header */}
        <Header />

        {/* Messages */}
        <AlertMessages error={error} success={success} />

        {/* Collection Selector */}
        <CollectionSelector 
          collections={collections.collections}
          currentCollection={collections.currentCollection}
          setCurrentCollection={collections.setCurrentCollection}
          createCollection={collections.createCollection}
          updateCollection={collections.updateCollection}
          deleteCollection={collections.deleteCollection}
          loading={collections.loading}
        />

        {/* Collection Content */}
        {collections.currentCollection ? (
          <Collection ratings={ratings} />
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">
              Select or create a collection to get started
            </p>
          </div>
        )}
      </div>
    </div>
  );
}