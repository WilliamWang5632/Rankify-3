import AddRating from "./add-rating";
// import Stats from "./stats";
import SearchSort from "./search-sort";
import Empty from "./empty";
import Ratings from "./ratings";
import RatingsList from "./ratings-list";
import Loading from "./loading";
import { Plus } from "lucide-react";

interface CollectionProps {
  ratings: ReturnType<typeof import("../hooks/useRating").default>;
}

export default function Collection({ ratings }: CollectionProps) {
  const {
    //getStats,
    searchTerm,
    setSearchTerm,
    sortBy,
    setSortBy,
    loading,
    filteredAndSortedItems,
    handleDelete,
    editing,
    form,
    handleChange,
    fileInputRef,
    handleImageUpload,
    setForm,
    handleSubmit,
    isModalOpen,
    openAddModal,
    openEditModal,
    closeModal,
    viewMode,
    setViewMode,
  } = ratings;

  //const stats = getStats();

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-3">
        <SearchSort
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          sortBy={sortBy}
          setSortBy={setSortBy}
          viewMode={viewMode}
          setViewMode={setViewMode}
        />
      </div>

      {/* <Stats stats={stats} /> */}

      {loading && <Loading loading={loading} />}

      <Empty
        loading={loading}
        filteredAndSortedItems={filteredAndSortedItems}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      {!loading &&
        (viewMode === "grid" ? (
          <Ratings
            filteredAndSortedItems={filteredAndSortedItems}
            openEditModal={openEditModal}
            loading={loading}
            handleDelete={handleDelete}
          />
        ) : (
          <RatingsList
            filteredAndSortedItems={filteredAndSortedItems}
            openEditModal={openEditModal}
            loading={loading}
            handleDelete={handleDelete}
          />
        ))}

      {/* Floating Add Button */}
      <button
        onClick={openAddModal}
        className="fixed bottom-6 right-6 z-40 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg transition-colors"
        aria-label="Add rating"
      >
        <Plus className="w-6 h-6" />
      </button>

      <AddRating
        isOpen={isModalOpen}
        loading={loading}
        editing={editing}
        form={form}
        handleChange={handleChange}
        fileInputRef={fileInputRef}
        handleImageUpload={handleImageUpload}
        setForm={setForm}
        handleSubmit={handleSubmit}
        closeModal={closeModal}
      />
    </div>
  );
}