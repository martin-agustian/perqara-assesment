<template>
  <Container>
    <div class="flex justify-between items-center mb-5">
      <TitleHead>
        discover movie
      </TitleHead>

      <div class="flex gap-[10px]">
        <Capsule>
          Popularity
        </Capsule>

        <Capsule variant="secondary">
          Release Date
        </Capsule>
      </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-[15px]">
      <Movie />
      <Movie />
      <Movie />
      <Movie />
      <Movie />
    </div>
  </Container>
</template>