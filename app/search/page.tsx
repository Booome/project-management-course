"use client";

import {
  SimpleProjectCard,
  SimpleTaskCard,
  SimpleUserCard,
} from "@/components/simpleCards";
import { Input } from "@/components/ui/input";
import { useSearchQuery } from "@/redux/api";
import { debounce } from "lodash";
import { useState } from "react";

export default function Page() {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: searchResults, isError } = useSearchQuery(searchTerm, {
    skip: searchTerm.length < 3,
  });

  const debouncedSearch = debounce((search: string) => {
    setSearchTerm(search);
  }, 500);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  if (isError) {
    return <div>Error occurred while searching...</div>;
  }

  return (
    <div className="px-4 py-6">
      <h1 className="text-2xl font-bold">Search</h1>

      <Input
        placeholder="Search..."
        className="mt-4 lg:w-72"
        onChange={handleInputChange}
      />

      {searchResults && (
        <div className="mt-4 flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <SearchHeader title="Projects" />
            {searchResults.projects &&
              searchResults.projects.map((project) => (
                <SimpleProjectCard key={project.id} project={project} />
              ))}
          </div>

          <div className="flex flex-col gap-4">
            <SearchHeader title="Tasks" />
            {searchResults.tasks &&
              searchResults.tasks.map((task) => (
                <SimpleTaskCard key={task.id} task={task} />
              ))}
          </div>

          <div className="flex flex-col gap-4">
            <SearchHeader title="Users" />
            {searchResults.users &&
              searchResults.users.map((user) => (
                <SimpleUserCard key={user.userId} user={user} />
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

function SearchHeader({ title }: { title: string }) {
  return (
    <h2 className="rounded-lg border-l-8 border-primary bg-foreground/5 p-2 px-4 text-lg font-bold">
      {title}:
    </h2>
  );
}
