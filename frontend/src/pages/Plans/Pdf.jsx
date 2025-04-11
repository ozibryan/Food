import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 20,
    backgroundColor: "#FFFFFF",
  },
  table: {
    display: "table",
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#ea580c",
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCol: {
    width: "20%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#ea580c",
    padding: 5,
    justifyContent: "center",
    height: "80px",
  },
  tableHeader: {
    backgroundColor: "#ea580c",
    fontWeight: "bold",
  },
  text: {
    fontSize: 12,
    textAlign: "center",
  },
  textTwo: {
    fontSize: 12,
    textAlign: "center",
    color: "#ffffff",
  },
  title: {
    fontSize: 18,
    textAlign: "center",
    padding: 10,
    color: "#ffffff",
    backgroundColor: "#ea580c",
  },
  recipeTitle: {
    fontSize: 24,
    marginBottom: 10,
    textAlign: "center",
    color: "#ffffff",
    backgroundColor: "#ea580c",
    padding: 10,
  },
  section: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },
  recipeText: {
    fontSize: 12,
    marginBottom: 5,
  },
  divider: {
    marginVertical: 10,
    height: 1,
    backgroundColor: "#ea580c",
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  checkbox: {
    width: 12,
    height: 12,
    borderWidth: 1,
    borderColor: "#ea580c",
    marginRight: 5,
  },
  ingredientText: {
    fontSize: 12,
  },
  ingredientImage: {
    width: 30,
    height: 30,
    marginLeft: 10,
  },
});

// Create Document Component
export const Pdf = ({ schedule, url, allIngredientsArray }) => {
  const daysOfWeek = Object.keys(schedule);

  // Generate dates for the current week
  const getCurrentWeekDates = () => {
    const today = new Date();
    const weekStart = new Date(
      today.setDate(today.getDate() - today.getDay() + 1)
    ); // Monday as the first day of the week
    return Array.from({ length: 7 }, (_, i) => {
      const currentDay = new Date(weekStart);
      currentDay.setDate(weekStart.getDate() + i);
      return currentDay.toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
      }); // e.g., "10 Jan"
    });
  };

  const currentWeekDates = getCurrentWeekDates();

  // Modify the recipes mapping to include the current week's dates
  const recipes = daysOfWeek.flatMap((day, index) =>
    ["breakfast", "lunch", "dinner", "snacks"].flatMap((mealType) =>
      schedule[day][mealType].map((recipe) => ({
        ...recipe,
        day: `${day.charAt(0).toUpperCase() + day.slice(1)} (${
          currentWeekDates[index]
        })`, // Add the date after the day
        mealType: mealType.charAt(0).toUpperCase() + mealType.slice(1),
      }))
    )
  );

  return (
    <Document>
      {/* Table on the first page */}
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>Weekly Meal Schedule</Text>
        </View>
        <View style={styles.table}>
          {/* Table Header */}
          <View style={[styles.tableRow, styles.tableHeader]}>
            <View style={styles.tableCol}>
              <Text style={styles.textTwo}>Day</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.textTwo}>Breakfast</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.textTwo}>Lunch</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.textTwo}>Dinner</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.textTwo}>Snacks</Text>
            </View>
          </View>

          {/* Table Rows */}
          {daysOfWeek.map((day, index) => (
            <View key={day} style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.text}>
                  {day.charAt(0).toUpperCase() + day.slice(1)}
                  {`(${currentWeekDates[index]})`}
                </Text>
              </View>
              {["breakfast", "lunch", "dinner", "snacks"].map((mealType) => (
                <View key={mealType} style={styles.tableCol}>
                  <Text style={styles.text}>
                    {schedule[day][mealType]
                      .map((meal) => meal.name)
                      .join(", ") || "-"}
                  </Text>
                </View>
              ))}
            </View>
          ))}
        </View>
      </Page>

      {/* Recipes on subsequent pages */}
      {recipes.map((recipe, index) => (
        <Page key={index} size="A4" style={styles.page}>
          {/* Recipe Title */}
          <Text style={styles.recipeTitle}>{recipe.name}</Text>

          <View style={styles.section}>
            {recipe &&
              recipe.recipeReference &&
              recipe.recipeReference.image && (
                <Image
                  src={url + "/images/" + recipe.recipeReference.image}
                  style={{ width: 50, height: 50, marginVertical: 5 }}
                />
              )}
          </View>

          {/* Recipe Category */}
          <View style={styles.section}>
            <Text style={styles.label}>Category:</Text>
            <Text style={styles.recipeText}>
              {recipe &&
                recipe.recipeReference &&
                recipe.recipeReference.category}
            </Text>
          </View>

          {/* Recipe Cuisine */}
          <View style={styles.section}>
            <Text style={styles.label}>Cuisine:</Text>
            <Text style={styles.recipeText}>
              {recipe &&
                recipe.recipeReference &&
                recipe.recipeReference.cuisine}
            </Text>
          </View>

          {/* Recipe Description */}
          <View style={styles.section}>
            <Text style={styles.label}>Description:</Text>
            <Text style={styles.recipeText}>
              {recipe &&
                recipe.recipeReference &&
                recipe.recipeReference.description}
            </Text>
          </View>

          {/* Recipe Prep Time */}
          <View style={styles.section}>
            <Text style={styles.label}>Prep Time:</Text>
            <Text style={styles.recipeText}>
              {recipe &&
                recipe.recipeReference &&
                recipe.recipeReference.preptime}
            </Text>
          </View>

          {/* Ingredients */}
          <View style={styles.section}>
            <Text style={styles.label}>Ingredients:</Text>
            {(recipe &&
              recipe.recipeReference &&
              recipe.recipeReference.ingredients?.map((ingredient, idx) => (
                <View key={idx} style={{ marginBottom: 10 }}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    {ingredient.image && (
                      <Image
                        src={url + "/images/" + ingredient.image}
                        style={{ width: 50, height: 50, marginRight: 10 }}
                      />
                    )}
                    <Text style={styles.recipeText}>
                      <Text style={{ fontWeight: "bold" }}>
                        {ingredient.name}:
                      </Text>
                      {` ${ingredient.quantity} ${ingredient.measure} (${ingredient.weight}g)`}
                    </Text>
                  </View>
                </View>
              ))) || (
              <Text style={styles.recipeText}>No ingredients listed.</Text>
            )}
          </View>

          {/* Instructions */}
          <View style={styles.section}>
            <Text style={styles.label}>Instructions:</Text>
            {(recipe &&
              recipe.recipeReference &&
              recipe.recipeReference.instruction?.map((instruction, idx) => (
                <View key={idx} style={{ marginBottom: 5 }}>
                  <Text style={styles.recipeText}>
                    <Text style={{ fontWeight: "bold" }}>
                      Step {instruction.step}:
                    </Text>
                    {` ${instruction.instruction}`}
                  </Text>
                </View>
              ))) || (
              <Text style={styles.recipeText}>No instructions provided.</Text>
            )}
          </View>

          {/* Divider */}
          <View style={styles.divider}></View>
        </Page>
      ))}

      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Shopping List</Text>
        {allIngredientsArray.map((ingredient) => (
          <View key={ingredient._id} style={styles.checkboxRow}>
            <View style={styles.checkbox} />
            <Text style={styles.ingredientText}>
              {ingredient.name} - {ingredient.quantity} {ingredient.measure} (
              {ingredient.weight}g)
            </Text>
            {ingredient.image && (
              <Image
                src={`${url}/images/${ingredient.image}`}
                style={styles.ingredientImage}
              />
            )}
          </View>
        ))}
      </Page>
    </Document>
  );
};
