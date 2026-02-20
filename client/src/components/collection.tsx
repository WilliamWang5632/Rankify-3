import AddRating from "./add-rating";
import Stats from "./stats";
import SearchSort from "./search-sort";
import Empty from "./empty";
import Ratings from "./ratings";
import Loading from "./loading";

interface CollectionProps {
  ratings: ReturnType<typeof import("../hooks/useRating").default>;
}

export default function Collection({ ratings }: CollectionProps) {
  const {
    getStats,
    searchTerm,
    setSearchTerm,
    sortBy,
    setSortBy,
    loading,
    filteredAndSortedItems,
    handleEdit,
    handleDelete,
    editing,
    form,
    handleChange,
    fileInputRef,
    handleImageUpload,
    setForm,
    handleSubmit,
    cancelEdit,
    clearMessages,
    isFormExpanded,
    setIsFormExpanded,
  } = ratings;

  const stats = getStats();

  return (
    <div className="flex gap-6 w-full">
      {/* Left Side - Form */}
      <div className={`shrink-0 ${isFormExpanded ? "w-96" : "w-60"} transition-all duration-300`}>
      <AddRating
        loading={loading}
        editing={editing}
        form={form}
        handleChange={handleChange}
        fileInputRef={fileInputRef}
        handleImageUpload={handleImageUpload}
        setForm={setForm}
        handleSubmit={handleSubmit}
        cancelEdit={cancelEdit}
        clearMessages={clearMessages}
        isFormExpanded={isFormExpanded}
        setIsFormExpanded={setIsFormExpanded}
      />
      </div>

      {/* Right Side - List */}
      <div className="flex-1 min-w-0">
        {/* Search and Sort Controls */}
        <SearchSort
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        {/* Stats */}
        <Stats stats={stats} />

        {/* Loading State */}
        {loading && <Loading loading={loading} />}

        {/* Empty State */}
        <Empty
          loading={loading}
          filteredAndSortedItems={filteredAndSortedItems}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        {/* Rating Cards Grid */}
        {!loading && (
          <Ratings
            filteredAndSortedItems={filteredAndSortedItems}
            handleEdit={handleEdit}
            loading={loading}
            handleDelete={handleDelete}
            isFormExpanded={isFormExpanded}
          />
        )}
      </div>
    </div>
  );
}
