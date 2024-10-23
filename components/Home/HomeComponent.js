"use client"

import { cardData } from "@/utils/data"

import { useState, useEffect } from "react"
import Select from "react-select"

const HomeComponent = () => {
  const [selectedOptions, setSelectedOptions] = useState({})
  const [filteredCards, setFilteredCards] = useState(cardData)

  const handleSelectChange = (tab, selectedOption) => {
    setSelectedOptions({
      ...selectedOptions,
      [tab]: selectedOption,
    })
  }

  useEffect(() => {
    filterData()
  }, [selectedOptions])

  const filterData = () => {
    let filtered = cardData

    // Apply filter for 'Pillar'
    if (selectedOptions["Pillar"]) {
      filtered = filtered.filter(
        (card) => card.pillar === selectedOptions["Pillar"].value
      )
    }

    // Apply filter for 'Regions Covered'
    if (selectedOptions["Regions Covered"]) {
      filtered = filtered.filter((card) =>
        card.regionsCovered.includes(selectedOptions["Regions Covered"].value)
      )
    }

    setFilteredCards(filtered)
  }

  const getAvailablePillars = () => {
    const regionsCoveredFilter = selectedOptions["Regions Covered"]
    if (regionsCoveredFilter) {
      return [
        ...new Set(
          cardData
            .filter((card) =>
              card.regionsCovered.includes(regionsCoveredFilter.value)
            )
            .map((card) => card.pillar)
        ),
      ].map((pillar) => ({ value: pillar, label: pillar }))
    }
    return [...new Set(cardData.map((card) => card.pillar))].map((pillar) => ({
      value: pillar,
      label: pillar,
    }))
  }

  const getAvailableRegions = () => {
    const pillarFilter = selectedOptions["Pillar"]
    if (pillarFilter) {
      return [
        ...new Set(
          cardData
            .filter((card) => card.pillar === pillarFilter.value)
            .flatMap((card) => card.regionsCovered)
        ),
      ].map((region) => ({ value: region, label: region }))
    }
    return [...new Set(cardData.flatMap((card) => card.regionsCovered))].map(
      (region) => ({ value: region, label: region })
    )
  }

  return (
    <div className="flex flex-col items-center h-screen p-10">
      <div className="flex gap-5 mb-10">
        {/* Pillar Selection */}
        <div>
          <label className="block mb-2">Pillar</label>
          <Select
            value={selectedOptions["Pillar"] || null}
            onChange={(selectedOption) =>
              handleSelectChange("Pillar", selectedOption)
            }
            options={getAvailablePillars()}
            isClearable={true}
            isSearchable={true}
            placeholder="Select a pillar"
            className="w-80" // Fixed width for select
          />
        </div>

        {/* Regions Covered Selection */}
        <div>
          <label className="block mb-2">Regions Covered</label>
          <Select
            value={selectedOptions["Regions Covered"] || null}
            onChange={(selectedOption) =>
              handleSelectChange("Regions Covered", selectedOption)
            }
            options={getAvailableRegions()}
            isClearable={true}
            isSearchable={true}
            placeholder="Select a region"
            className="w-80" // Fixed width for select
          />
        </div>
      </div>

      {/* Filtered Cards Display */}
      <div className="grid grid-cols-1 gap-5">
        {filteredCards.map((card, index) => (
          <div key={index} className="border p-5">
            <h3 className="font-bold text-lg">{card.organizationName}</h3>
            <p>{card.solution}</p>
            <p>
              <strong>Regions Covered:</strong> {card.regionsCovered.join(", ")}
            </p>
            <p>
              <strong>Pillar:</strong> {card.pillar}
            </p>
            <p>
              <strong>Impacts:</strong> {card.impacts}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HomeComponent
