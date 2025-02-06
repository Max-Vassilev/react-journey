let names = ["Maxim", "Maxim", "Ivan", "Alex"];

// .map
console.log(names);

names2 = names.map((person_name) => {
    return person_name + " Johnson";
});

console.log(names2);

// .filter
names3 = names.filter((person_name) => {
    return person_name !== "Maxim"
})

console.log(names3);
