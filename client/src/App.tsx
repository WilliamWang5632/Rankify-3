import useCollections from "./hooks/useCollections";
import useRating from "./hooks/useRating";
import useTheme from "./hooks/useTheme";
import AlertMessages from "./components/alerts";
import Header from "./components/header";
import CollectionSelector from "./components/collection-selector";
import Collection from "./components/collection";
import Loading from "./components/loading";

export default function App() {
  const collections = useCollections();
  const ratings = useRating({ 
    collectionId: collections.currentCollection?.id || null 
  });
  const { theme, setTheme } = useTheme();

  const error = collections.error || ratings.error;
  const success = collections.success || ratings.success;
  const isLoading = collections.loading || ratings.loading;

  return (
    <div className="min-h-screen w-full bg-background text-foreground min-w-[100vw]">
      <div className="min-w-full max-w-full mx-auto px-3 sm:px-6 md:px-8 py-2">
        <Header theme={theme} setTheme={setTheme} />

        <CollectionSelector 
          collections={collections.collections}
          currentCollection={collections.currentCollection}
          setCurrentCollection={collections.setCurrentCollection}
          createCollection={collections.createCollection}
          updateCollection={collections.updateCollection}
          deleteCollection={collections.deleteCollection}
          loading={collections.loading}
        />

        <AlertMessages error={error} success={success} />

        {isLoading && <Loading loading={isLoading} />}

        {!isLoading && (
          collections.currentCollection ? (
            <Collection ratings={ratings} />
          ) : (
            <div className="text-center py-12 min-w-full">
              <p className="text-muted-foreground text-lg">
                Select or create a collection to get started
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
}