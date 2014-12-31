/**
 * Created by chenasraf on 12/29/14.
 */
$('.main')

    .on('click', 'div#motd', function() {
        $(this).replaceWith('<textarea class="well well-sm" id="motd">' + this.innerHTML + '</textarea>');
        $('#motd').show().trigger('focus');
    })

    .on('keyup blur', '#motd', $.debounce(800, function() {
        $.post('/api/motd', { content: $(this).val() });
    }))

    .on('blur', 'textarea#motd', function() {
        $(this).replaceWith('<div class="well well-sm" id="motd">' + this.value + '</div>');
        $('#motd').show();
    });