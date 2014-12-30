/**
 * Created by chenasraf on 12/29/14.
 */
$('.main')

    .on('click', 'div#well', function() {
        $(this).replaceWith('<textarea class="well well-sm" id="well">' + this.innerHTML + '</textarea>');
        $('#well').show().trigger('focus');
    })

    .on('keyup blur', '#well', $.debounce(800, function() {
        $.post('/api/motd', { content: $(this).val() });
    }))

    .on('blur', 'textarea#well', function() {
        $(this).replaceWith('<div class="well well-sm" id="well">' + this.value + '</div>');
        $('#well').show();
    });