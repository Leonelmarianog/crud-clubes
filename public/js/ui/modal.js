// https://getbootstrap.com/docs/4.0/components/modal/#varying-modal-content
$('#modalCenter').on('show.bs.modal', (event) => {
  const $button = $(event.relatedTarget);
  const id = $button.data('id');
  const name = $button.data('name');
  const domain = $button.data('domain');
  const $modal = $(event.currentTarget);

  $modal.find('strong').text(name);
  $modal.find('a').attr('href', `/${domain}/delete/${id}`);
});
