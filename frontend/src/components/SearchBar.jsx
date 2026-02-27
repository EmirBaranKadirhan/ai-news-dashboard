import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

import React from 'react'



function SearchBar({ onSearch }) {
    return (
        <Field className="w-full max-w-xl mx-auto">
            <FieldLabel htmlFor="input-field-username"
                className="text-sm font-medium text-muted-foreground"
            >
                Haber Arama
            </FieldLabel>
            <Input
                id="input-field-username"
                type="text"
                placeholder="Aramak istediginiz kelimeyi yaziniz"
                onChange={(e) => onSearch(e.target.value)}
            />
            <FieldDescription className="text-xs text-muted-foreground/70">
                Herhangi bir harf ya da kelime yazin ilgili haberleri gorun


            </FieldDescription>
        </Field>
    )
}

export default SearchBar




