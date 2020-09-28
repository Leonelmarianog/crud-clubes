// https://getbootstrap.com/docs/4.0/components/modal/#varying-modal-content
$('#modalCenter').on('show.bs.modal', (event) => {
  const $button = $(event.relatedTarget);
  const clubId = $button.data('id');
  const clubName = $button.data('name');
  const $modal = $(event.currentTarget);

  $modal.find('[name="clubName"]').text(clubName);
  $modal.find('a').attr('href', `/club/delete/${clubId}`);
});
