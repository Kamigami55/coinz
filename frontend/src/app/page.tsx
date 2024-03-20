/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
'use client';

import * as React from 'react';

import { Counter } from '@/components/Counter';
import { useGetPokemonByNameQuery } from '@/lib/services/pokemon';

export default function Home() {
  // Using a query hook automatically fetches data and returns query values
  const { data, error, isLoading } = useGetPokemonByNameQuery('bulbasaur');
  // Individual hooks are also accessible under the generated endpoints:
  // const { data, error, isLoading } = pokemonApi.endpoints.getPokemonByName.useQuery('bulbasaur')

  return (
    <div className="p-12">
      <div className="flex flex-col md:flex-row md:justify-between gap-6 md:items-center mb-4">
        <div>
          <h1 className="text-3xl font-bold mb-1">Time Zone Converter</h1>
          <h2 className="text-lg font-medium text-[#7C7C7C] dark:text-[#DFDFDF]">
            Easily convert time between different timezones and compare
            overlapping time periods.
          </h2>

          <Counter />

          {error ? (
            <>Oh no, there was an error</>
          ) : isLoading ? (
            <>Loading...</>
          ) : data ? (
            <>
              <h3>{data.species.name}</h3>
              <img src={data.sprites.front_shiny} alt={data.species.name} />
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
