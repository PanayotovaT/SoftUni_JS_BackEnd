<div class="accessory">
    <img src="https://images-na.ssl-images-amazon.com/images/I/61J8UP8pySL._SX425_.jpg" alt="stickerName" />
    <h3>{{ name }}</h3>
    <p>{{ description }}</p>
    <p><span>Price:</span>
        {{ #if price }}{{ price }}{{ else}}free{{/if}}
    </p>

</div>